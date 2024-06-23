"use server"
import { Paper, Stack, Typography } from '@mui/material'

import { Coordinate } from 'ol/coordinate';
import LineString from 'ol/geom/LineString';
import {getAllLaunchesAndCoordinates} from "@/util/launchUtils";

type RocketDistance = { name: string, distance: number }
type RocketDistances = RocketDistance[]

export default async function Distance(props: {selectedRocketIndex: number, address: any }) {

    const launchesAndCoordinates = await getAllLaunchesAndCoordinates();
    const launches = launchesAndCoordinates.rockets;
    const coords = launchesAndCoordinates.coords;

    const distances: RocketDistances = calculateDistance();
    const closestRocket = getClosestRocket(distances);
    const inRange = getInRange(distances);
    const currentDistance = getCurrentDistance(distances, props.selectedRocketIndex);

    function isValidIndex(dis: any[], idx: number): boolean {
        return (idx < dis.length &&  idx >= 0);
    }

    function getCurrentDistance(dis: RocketDistances, idx: number): string {
        if(isValidIndex(dis, idx)) {
            return String(distances[props.selectedRocketIndex].distance);
        }
        return "";
    }

    function calculateDistance(): RocketDistances {
        var rockets: { name: string, distance: number }[] = [];
        var coordinates2: number[] = [];
        coordinates2[1] = props.address.geometry.coordinates[1]
        coordinates2[0] = props.address.geometry.coordinates[0]

        if (coords) {
            for (let index = 0; index < launches.length; index++) {
                var coordinates1: number[] = [];
                coordinates1[0] = coords[index][1]
                coordinates1[1] = coords[index][0]
                //var dis: number = getDistanceFromLatLonInMi(coordinates1[0], coordinates1[1], coordinates2[0], coordinates2[1])
                const line = new LineString([coordinates1, coordinates2]);
                //var dis = vincenty.distVincenty(coordinates1[0], coordinates1[1], coordinates2[0], coordinates2[1]).distance
                var dis = getVincentyDistance(coordinates1[0], coordinates1[1], coordinates2[0], coordinates2[1])
                //console.log(dis)
                //const dis = getLength(line) * 62.77718927508465; 
                rockets.push({ name: launches[index].vehicle.name, distance: dis })

            }
        }

        return rockets;
    }

    function getDistanceFromLatLonInMi(lat1: number, lon1: number, lat2: number, lon2: number) {
        const earthRadius = 6371; // Earth's radius in kilometers

        const dLat = (lat2 - lat1) * (Math.PI / 180);
        const dLon = (lon2 - lon1) * (Math.PI / 180);
    
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
    
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const dis = earthRadius * c;
    
        return dis;
    }

    function getVincentyDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
        const a = 6378137; // Semi-major axis of the Earth (in meters)
        const f = 1 / 298.257223563; // Flattening of the Earth
    
        const toRadians = (angle : number) => (angle * Math.PI) / 180;
    
        const phi1 = toRadians(lat1);
        const phi2 = toRadians(lat2);
        const deltaLambda = toRadians(lon2 - lon1);
    
        const U1 = Math.atan((1 - f) * Math.tan(phi1));
        const U2 = Math.atan((1 - f) * Math.tan(phi2));
        const sinU1 = Math.sin(U1);
        const cosU1 = Math.cos(U1);
        const sinU2 = Math.sin(U2);
        const cosU2 = Math.cos(U2);
    
        let lambda = deltaLambda;
        let lambdaP;
        let iterationLimit = 100;
        let cosLambda;
        let sinLambda;
        let sinSigma;
        let cosSigma;
        let sigma;
        let sinAlpha;
        let cosSqAlpha;
        let cos2SigmaM;
        let C;
    
        do {
            sinLambda = Math.sin(lambda);
            cosLambda = Math.cos(lambda);
            sinSigma = Math.sqrt((cosU2 * sinLambda) ** 2 + (cosU1 * sinU2 - sinU1 * cosU2 * cosLambda) ** 2);
            cosSigma = sinU1 * sinU2 + cosU1 * cosU2 * cosLambda;
            sigma = Math.atan2(sinSigma, cosSigma);
            sinAlpha = cosU1 * cosU2 * sinLambda / sinSigma;
            cosSqAlpha = 1 - sinAlpha ** 2;
            cos2SigmaM = cosSigma - 2 * sinU1 * sinU2 / cosSqAlpha;
            C = f / 16 * cosSqAlpha * (4 + f * (4 - 3 * cosSqAlpha));
            lambdaP = lambda;
            lambda = deltaLambda + (1 - C) * f * sinAlpha *
                (sigma + C * sinSigma * (cos2SigmaM + C * cosSigma * (-1 + 2 * cos2SigmaM ** 2)));
        } while (Math.abs(lambda - lambdaP) > 1e-12 && --iterationLimit > 0);
    
        if (iterationLimit === 0) {
            console.warn('Vincenty formula did not converge');
            return NaN; // Not converged
        }
    
        const uSq = cosSqAlpha * (a ** 2 - (a * Math.sin(sigma)) ** 2) / ((a * Math.cos(sigma)) ** 2);
        const A = 1 + uSq / 16384 * (4096 + uSq * (-768 + uSq * (320 - 175 * uSq)));
        const B = uSq / 1024 * (256 + uSq * (-128 + uSq * (74 - 47 * uSq)));
        const deltaSigma = B * sinSigma * (cos2SigmaM + B / 4 * (cosSigma * (-1 + 2 * cos2SigmaM ** 2) -
            B / 6 * cos2SigmaM * (-3 + 4 * sinSigma ** 2) * (-3 + 4 * cos2SigmaM ** 2)));
    
        const distance = a * A * (sigma - deltaSigma); // Result in meters
    
        return distance;
    }

    function deg2rad(deg: number) {
        return deg * (Math.PI / 180)
    }

    function getClosestRocket(dis: RocketDistances): RocketDistance {
        if (dis.length > 0) {
            var closest: number = 0;
            for (let index = 0; index < dis.length; index++) {
                if (dis[index].distance < dis[closest].distance) {
                    closest = index
                }
            }
            return dis[closest];
        }
        return {name: "NaN", distance: 0};
    }

    function getInRange(dis: RocketDistances): string[] {
        var closeRockets: string[] = [];
        for (let index = 0; index < dis.length; index++) {
            if (dis[index].distance < 50) {
                closeRockets.push(dis[index].name)
            }
        }
        return closeRockets;
    }

    return (
        <Paper elevation={10} sx={{ padding: 1 }}>
            {isValidIndex(distances, props.selectedRocketIndex) && props.address != undefined ?
                <Stack direction="row" sx={{ height: 1, padding: 1 }} spacing={1}>
                    <Stack direction="column" justifyContent="space-between">
                        <Stack direction="row" spacing={1} justifyContent="space-between" alignItems="center" sx={{ width: 1, height: 1 }}>
                            <Typography variant='h5'>
                                rocket name:
                            </Typography>
                            <Typography variant='h5'>
                                {launches[props.selectedRocketIndex].vehicle.name}
                            </Typography>
                        </Stack>
                        <Stack direction="row" spacing={1} justifyContent="space-between" alignItems="center" sx={{ width: 1, height: 1 }}>
                            <Typography variant='body1'>
                                Launch Location:
                            </Typography>
                            <Typography variant='body1'>
                                {launches[props.selectedRocketIndex].pad.location.name}
                            </Typography>
                        </Stack>
                        <Stack direction="row" spacing={1} justifyContent="space-between" alignItems="center" sx={{ width: 1, height: 1 }}>
                            <Typography variant='body1'>
                                distance:
                            </Typography>
                            {closestRocket && <Typography variant='body1'>
                                {/* {String(closestRocket.distance)} */}
                                {currentDistance}
                            </Typography>}
                        </Stack>
                    </Stack>
                </Stack> : <Typography noWrap>Type your Location</Typography>
            }
        </Paper>
    )
}

