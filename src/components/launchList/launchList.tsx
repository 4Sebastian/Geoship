"use server"
import {Paper, Stack, Typography } from '@mui/material'

import {getAllLaunchesAndCoordinates} from "@/util/launchUtils";
import LaunchListWithHover from "@/components/launchList/launchListWithHover";

export default async function LaunchList() {
    const launchesAndCoordinates = await getAllLaunchesAndCoordinates();
    const launches = launchesAndCoordinates.rockets;

    return (
        <Paper elevation={10} sx={{ height: "400px", pointerEvents: "auto", overflowY: "auto" }}>
            <Stack direction="column">
                <Paper elevation={2} sx={{ padding: 1 }}>
                    <Typography>Upcoming Launches</Typography>
                </Paper>
                <LaunchListWithHover launches={launches}/>
            </Stack>
        </Paper >
    )
}