"use server"
import { Paper, Stack, Typography } from '@mui/material'
import {getAllLaunchesAndCoordinates} from "@/util/launch/launchUtils";

export default async function RocketInfo(props: { selectedRocketIndex: number, address: any}) {
    const launchesAndCoordinates = await getAllLaunchesAndCoordinates();
    const launches = launchesAndCoordinates.getRockets();

    return (
        
        <Paper elevation={10} sx={{ padding: 1 }}>
            {(props.selectedRocketIndex != null && launches.length > props.selectedRocketIndex) ? <Stack direction="row" sx={{ height: 1, padding: 1 }} spacing={1}>
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
                            {launches[props.selectedRocketIndex].pad.locationName}
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
                    <Stack direction="row" spacing={1} justifyContent="space-between" alignItems="center" sx={{ width: 1, height: 1 }}>
                        <Typography variant='body1'>
                            Time until launch:
                        </Typography>
                        <Typography variant='body1'>
                            blurb
                        </Typography>
                    </Stack>
                </Stack>
            </Stack> : <Typography noWrap>Select a Rocket!</Typography>}
        </Paper>
    )
}
