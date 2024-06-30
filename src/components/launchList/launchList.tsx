"use server"
import {Paper, Stack, Typography } from '@mui/material'

import {getAllLaunchesAndCoordinates} from "@/util/launch/launchUtils";
import LaunchListWithHover from "@/components/launchList/launchListWithHover";
import {URLSearchParamsType} from "@/util/routingUtils";

export default async function LaunchList({params}: { params: URLSearchParamsType}) {
    const launchesAndCoordinates = await getAllLaunchesAndCoordinates();
    const launches = launchesAndCoordinates.getRockets();

    return (
        <Paper elevation={10} sx={{ height: "400px", pointerEvents: "auto", overflowY: "auto" }}>
            <Stack direction="column">
                <Paper elevation={2} sx={{ padding: 1 }}>
                    <Typography>Upcoming Launches</Typography>
                </Paper>
                <LaunchListWithHover launches={launches} params={params}/>
            </Stack>
        </Paper >
    )
}