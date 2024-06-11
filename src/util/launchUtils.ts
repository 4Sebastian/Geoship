export async function getPadDetailsResponse(padId: string): Promise<Response> {
    return await fetch(`https://fdo.rocketlaunch.live/json/pads?id=${padId}&key=${process.env.NEXT_PUBLIC_ROCKET_TOKEN}`);
}

export async function getAllLaunchesResponse(): Promise<Response> {
    return await fetch(`https://fdo.rocketlaunch.live/json/launches?key=${process.env.NEXT_PUBLIC_ROCKET_TOKEN}`);
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