import { List, ListItem, ListItemText, Paper, Stack, Typography } from '@mui/material'

import React, { useState, useEffect } from "react";
import getLaunchData from './launchData';
import LaunchHover from './launchHover';

export default function LaunchList(props: { setCoordinates: Function, setSelectedRocket: Function, setSelectedRocketIndex: Function }) {
    const [launches, setLaunches] = useState<any[]>([]);
    const [hoveredItem, setHoveredItem] = useState<any>(null);
    const [estimatedDate, setEstimatedDate] = useState<any>(undefined);
    const [ticking, setTicking] = useState<boolean>(false)

    useEffect(() => {
        getLaunchData(setLaunches, props.setCoordinates)
    }, []);

    function handleHover(value: any) {
        setHoveredItem(value)
        if (value) {
            setEstimatedDate(value.t0)
            setTicking(true)
        } else {
            setEstimatedDate(undefined)
            setTicking(false)
        }
    }

    function handleClick(value: any, index: number) {
        props.setSelectedRocket(value)
        props.setSelectedRocketIndex(index)
    }

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
                        launches.map((value, index) => (
                            <ListItem
                                key={value.id}
                                onMouseEnter={() => handleHover(value)}
                                onMouseLeave={() => handleHover(null)}
                                onMouseDown={() => handleClick(value, index)}>
                                <ListItemText primary={`Rocket: ${value.vehicle.name}`} />
                            </ListItem>
                        ))}
                </List>
            </Stack>

            <LaunchHover estimatedDate={estimatedDate} hoveredItem={hoveredItem} ticking={ticking} />
        </Paper >
    )
}