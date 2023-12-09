import { Box, Grid, List, ListItem, ListItemText, Paper, Stack, TextField, Tooltip, Typography } from '@mui/material'

import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Coordinate } from 'ol/coordinate';

export default function Distance(props: { launches: any[], coordinates: Coordinate[] | undefined, selectedRocket: any, address: any }) {

    const [distances, setDistances] = useState<{ name: string, distance: number }[]>([]);
    const [closestRocket, setClosestRocket] = useState<string>('');
    const [inRange, setInRange] = useState<string[]>([]);

    async function calculateDistance() {
        var rockets: { name: string, distance: number }[] = [];
        var coordinates2: number[] = [];
        coordinates2[1] = props.address.geometry.coordinates[1]
        coordinates2[0] = props.address.geometry.coordinates[0]
        
        if (props.coordinates) {
            for (let index = 0; index < props.launches.length; index++) {
                var coordinates1: number[] = [];
                coordinates1[0] = props.coordinates[index][1]
                coordinates1[1] = props.coordinates[index][0]
                var dis: number = getDistanceFromLatLonInMi(coordinates1[0], coordinates1[1], coordinates2[0], coordinates2[1])
                rockets.push({ name: props.launches[index].vehicle.name, distance: dis })

            }
        }
        console.log(props.address.geometry.coordinates)
        console.log(props.coordinates)
        console.log(rockets)
        setDistances(rockets)
        getClosestRocket()
        getInRange()
    }

    function getDistanceFromLatLonInMi(lat1:number, lon1:number, lat2:number, lon2:number) {
        const R = 6371; // Radius of the earth in km
        const dLat = deg2rad(lat2 - lat1);
        const dLon = deg2rad(lon2 - lon1);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distanceInKm = R * c; // Distance in km
        const distanceInMi = distanceInKm * 0.621371; // Conversion from km to miles
        return distanceInMi;
    }

    function deg2rad(deg: number) {
        return deg * (Math.PI / 180)
    }

    function getClosestRocket() {
        var closest: number = 0;
        for (let index = 0; index < distances.length; index++) {
            if (distances[index].distance < distances[closest].distance) {
                closest = index
            }
        }

        setClosestRocket(distances[closest].name)
    }

    function getInRange() {
        var closeRockets: string[] = [];
        for (let index = 0; index < distances.length; index++) {
            if (distances[index].distance < 50) {
                closeRockets.push(distances[index].name)
            }
        }

        setInRange(closeRockets)
    }

    useEffect(() => {

        if (props.address && props.selectedRocket) {
            calculateDistance()

        }

    }, [props.selectedRocket, props.address])

    return (
        <Paper elevation={10} sx={{ padding: 1 }}>
            {props.selectedRocket != null && props.address != null ? <Stack direction="row" sx={{ height: 1, padding: 1 }} spacing={1}>
                <Stack direction="column" justifyContent="space-between">
                    <Stack direction="row" spacing={1} justifyContent="space-between" alignItems="center" sx={{ width: 1, height: 1 }}>
                        <Typography variant='h5'>
                            rocket name:
                        </Typography>
                        <Typography variant='h5'>
                            {props.selectedRocket.vehicle.name}
                        </Typography>
                    </Stack>
                    <Stack direction="row" spacing={1} justifyContent="space-between" alignItems="center" sx={{ width: 1, height: 1 }}>
                        <Typography variant='body1'>
                            Launch Location:
                        </Typography>
                        <Typography variant='body1'>
                            {props.selectedRocket.pad.location.name}
                        </Typography>
                    </Stack>
                    <Stack direction="row" spacing={1} justifyContent="space-between" alignItems="center" sx={{ width: 1, height: 1 }}>
                        <Typography variant='body1'>
                            Launch date:
                        </Typography>
                        <Typography variant='body1'>
                            blurb
                        </Typography>
                    </Stack>
                </Stack>
            </Stack> : <Typography noWrap>Type your Location</Typography>}
        </Paper>
    )
}

