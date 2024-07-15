"use server"
import fakeRocketData from '@/test/fakeRocketData.json';
import fakePadData from '@/test/fakePadData.json';
import {CoordinateObj, LaunchesObj, RocketObj} from "@/util/launch/launchDefinitions";

export async function getPadDetailsResponse(padId: string): Promise<Response> {
    return await fetchData(
        `https://fdo.rocketlaunch.live/json/pads?id=${padId}&key=${process.env.ROCKET_TOKEN}`,
        JSON.stringify(fakePadData)
    );
}

export async function getAllLaunchesResponse(): Promise<Response> {
    return await fetchData(
        `https://fdo.rocketlaunch.live/json/launches?key=${process.env.ROCKET_TOKEN}`,
        JSON.stringify(fakeRocketData)
    );
}

export async function fetchData(api: string, fakeBody: string): Promise<Response> {
    if(process.env.STAGE !== "test"){
        return await fetch(api);
    }else{
        return new Response(fakeBody, {status: 200});
    }
}

export async function parseAllLaunchesAndCoordinates(launchDetails: Response[], body: any): Promise<LaunchesObj> {
    var rockets: RocketObj[] = [];
    var coords: CoordinateObj[] = [];
    for (let index = 0; index < launchDetails.length; index++) {
        var valueBody = await launchDetails[index].json()
        if (valueBody.result[0].location.longitude != "") {
            var coord: CoordinateObj = {
                gcs: [parseFloat(valueBody.result[0].location.latitude), parseFloat(valueBody.result[0].location.longitude)],
                padName: valueBody.result[0].name,
                locationName: valueBody.result[0].location.name,
                fullName: valueBody.result[0].full_name
            }

            var rocket: RocketObj = {
                id: body.result[index].id,
                name: body.result[index].name,
                provider: {
                    id: body.result[index].provider.id,
                    name: body.result[index].provider.name,
                    slug: body.result[index].provider.slug
                },
                vehicle: {
                    id: body.result[index].vehicle.id,
                    name: body.result[index].vehicle.name,
                    slug: body.result[index].vehicle.slug
                },
                pad: {
                    id: body.result[index].pad.id,
                    name: body.result[index].pad.name,
                    locationId: body.result[index].pad.location.id,
                    locationName:  body.result[index].pad.location.name
                },
                launchDescription: body.result[index].launch_description,
                launchDate: new Date(body.result[index].t0),
                launchDateDetails: {
                    month: body.result[index].est_date.month,
                    day: body.result[index].est_date.day,
                    year: body.result[index].est_date.year
                },
                slug: body.result[index].slug,
                medias: (body.result[index].media as Array<any>).map((media: any) => {
                    return {
                        id: media.id,
                        url: media.media_url,
                        account: media.x_accountid,
                        postId: media.x_postid,
                    }
                }),
                mission: {
                    id: body.result[index].missions[0].id,
                    name: body.result[index].missions[0].name,
                    description: body.result[index].missions[0].description
                }
            }

            coords.push(coord);
            rockets.push(rocket);
        }
    }
    //console.log(rockets);
    return new LaunchesObj(rockets, coords);
}

export async function getAllLaunchesAndCoordinates(): Promise<LaunchesObj> {
    var res: Response = await getAllLaunchesResponse();
    if (res.status !== 200) {
        throw new Error(res.statusText);
    }
    var body: any = await res.json();

    var promises: Promise<Response>[] = [];
    for (var idx in body.result) {
        if (body.result[idx]?.vehicle?.name != "TBD") {
            var padId = body.result[idx]?.pad?.id;
            promises.push(getPadDetailsResponse(padId));
        }
    }

    return await parseAllLaunchesAndCoordinates(await Promise.all(promises), body);
}

export async function getValidRocketIndex(potentialIndex: string | string[] | undefined): Promise<number> {
    //console.log(potentialIndex);
    //console.log(typeof potentialIndex);
    if(typeof potentialIndex !== "string") {
        return Number.MAX_SAFE_INTEGER;
    }

    const parsedIndex = Number(potentialIndex as string);

    if(isNaN(parsedIndex)) {
        return Number.MAX_SAFE_INTEGER;
    }

    return parsedIndex;
}