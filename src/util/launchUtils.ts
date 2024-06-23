"use server"
import fakeRocketData from '@/test/fakeRocketData.json';
import fakePadData from '@/test/fakePadData.json';

export async function getPadDetailsResponse(padId: string): Promise<Response> {
    return await fetchData(
        `https://fdo.rocketlaunch.live/json/pads?id=${padId}&key=${process.env.NEXT_PUBLIC_ROCKET_TOKEN}`,
        JSON.stringify(fakePadData)
    );
}

export async function getAllLaunchesResponse(): Promise<Response> {
    return await fetchData(
        `https://fdo.rocketlaunch.live/json/launches?key=${process.env.NEXT_PUBLIC_ROCKET_TOKEN}`,
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

export async function compileAllLaunchesAndCoordinates(launchDetails: Response[], body: any): Promise<{
    rockets: any[],
    coords: any[]
}> {
    var rockets: any[] = [];
    var coords: any[] = [];
    for (let index = 0; index < launchDetails.length; index++) {
        var valueBody = await launchDetails[index].json()
        if (valueBody.result[0].location.longitude != "") {
            coords.push([parseFloat(valueBody.result[0].location.latitude), parseFloat(valueBody.result[0].location.longitude)])
            rockets.push(body.result[index])
        }
    }
    //console.log(rockets);
    return {rockets: rockets, coords: coords};
}

export async function getAllLaunchesAndCoordinates(): Promise<{ rockets: any[], coords: any[] }> {
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

    return await compileAllLaunchesAndCoordinates(await Promise.all(promises), body);
}

export async function getValidRocketIndex(potentialIndex: string | string[] | undefined): Promise<number | undefined> {
    console.log(potentialIndex);
    console.log(typeof potentialIndex);
    if(typeof potentialIndex !== "string") {
        return undefined;
    }

    const parsedIndex = Number(potentialIndex as string);

    if(isNaN(parsedIndex)) {
        return undefined;
    }

    return parsedIndex;
}