export class LaunchesObj {
    rockets: RocketObj[];
    coords: CoordinateObj[];
    complexRockets: ComplexRocket[];

    constructor(rockets: RocketObj[] = [], coords: CoordinateObj[] = []){
        this.rockets = rockets;
        this.coords = coords;
        this.complexRockets = this.computeComplexRockets(rockets, coords);
    }

    public getRockets(): RocketObj[]{
        return this.rockets;
    }

    public getCoords(): CoordinateObj[]{
        return this.coords;
    }

    public getComplexRockets(): ComplexRocket[]{
        return this.complexRockets;
    }

    public computeComplexRockets(rockets: RocketObj[] = [], coords: CoordinateObj[] = []): ComplexRocket[]{
        if(rockets.length != coords.length){
            return []
        }

        var res: ComplexRocket[] = [];

        for(var index in rockets){
            var complexRocket: ComplexRocket = {
                ...rockets[index],
                coord: coords[index]
            }
            res.push(complexRocket);
        }

        return res
    }
}

export type RocketObj = {
    id: number
    name: string
    provider: {
        id: number
        name: string
        slug: string
    }
    vehicle: {
        id: number
        name: string
        slug: string
    }
    pad: {
        id: number
        name: string
        locationId: string
        locationName: string
    }
    launchDescription: string
    launchDate: Date
    launchDateDetails: {
        month: number
        day: number
        year: number
    }
    slug: string
}

export type ComplexRocket = RocketObj & {
    coord: CoordinateObj
}

export type CoordinateObj = {
    gcs: [number, number]
    padName: string
    locationName: string
    fullName: string
}