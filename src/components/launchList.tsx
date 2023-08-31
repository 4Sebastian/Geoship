import { Box, List, ListItem, ListItemText, Paper, Stack, Typography } from '@mui/material'

import React, { useState, useEffect } from "react";
import axios from 'axios';

export default function LaunchList() {
    const [launches, setLaunches] = useState<any[]>([]);
    const [coordinates, setCoordinates] = useState<number[][]>();


    useEffect(() => {
        axios.get('https://fdo.rocketlaunch.live/json/launches/next/5')
            .then(async function (response) {
                var rockets = []
                var coordinates: number[][] = [];
                for (let index = 0; index < response.data.count; index++) {
                    await new Promise(res => setTimeout(res, 1000)).then(() => {
                        var location = (response.data.result[index].pad.name).replace(/ /g, "+")
                        axios.get(`https://geocode.maps.co/search?q={${location}}`)
                            .then(function (response) {
                                coordinates[index] = [response.data[0].lat, response.data[0].lon]
                            })
                    });
                    rockets[index] = response.data.result[index]
                }
                setLaunches(rockets);
                setCoordinates(coordinates);
            })
            .catch(function (error) {
                console.log(error);
            })
    }, []);

    return (
        <Paper elevation={10} sx={{ height: "min-content", pointerEvents: "auto" }}>
            <Stack direction="column">
                <Paper elevation={2} sx={{ padding: 1 }}>
                    <Typography>Upcoming Launches</Typography>
                </Paper>
                <List>
                    {launches.length == 0 ?
                        <ListItem key="loading">
                            <ListItemText primary={`Loading...`} />
                        </ListItem>
                        :
                        launches.map((value) => (
                            <ListItem key={value.id}>
                                <ListItemText primary={`Rocket: ${value.vehicle.name}`} />
                            </ListItem>
                        ))}
                </List>
            </Stack>
        </Paper>
    )
}