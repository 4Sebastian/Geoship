"use server"
import {Paper, Stack, Typography} from '@mui/material'
import {getAllLaunchesAndCoordinates} from "@/util/launch/launchUtils";
import {ReactJSXElement} from "@emotion/react/types/jsx-namespace";
import {ComplexRocket, RocketObj} from "@/util/launch/launchDefinitions";

export default async function RocketInfo(props: { selectedRocketIndex: number, address: any }) {
    const launchesAndCoordinates = await getAllLaunchesAndCoordinates();
    const launches = launchesAndCoordinates.getComplexRockets();

    const wrapper = (children: ReactJSXElement) => {
        return <Paper elevation={10} sx={{padding: 1}}>{children}</Paper>
    }

    if (launches.length < props.selectedRocketIndex) {
        return wrapper(<Typography noWrap>Select a Rocket!</Typography>)
    }

    const launch: ComplexRocket = launches[props.selectedRocketIndex];
    return wrapper(
        <Stack direction="row" sx={{height: 1, padding: 1}} spacing={1}>
            <Stack direction="column" justifyContent="space-between">
                <Stack direction="row" spacing={1} justifyContent="space-between" alignItems="center"
                       sx={{width: 1, height: 1}}>
                    <Typography variant='h5'>
                        rocket name:
                    </Typography>
                    <Typography variant='h5'>
                        {launch.vehicle.name}
                    </Typography>
                </Stack>
                <Stack direction="row" spacing={1} justifyContent="space-between" alignItems="center"
                       sx={{width: 1, height: 1}}>
                    <Typography variant='body1'>
                        Launch Location:
                    </Typography>
                    <Typography variant='body1'>
                        {launch.pad.locationName}
                    </Typography>
                </Stack>
                <Stack direction="row" spacing={1} justifyContent="space-between" alignItems="center"
                       sx={{width: 1, height: 1}}>
                    <Typography variant='body1'>
                        Launch date:
                    </Typography>
                    <Typography variant='body1'>
                        blurb
                    </Typography>
                </Stack>
                <Stack direction="row" spacing={1} justifyContent="space-between" alignItems="center"
                       sx={{width: 1, height: 1}}>
                    <Typography variant='body1'>
                        Time until launch:
                    </Typography>
                    <Typography variant='body1'>
                        blurb
                    </Typography>
                </Stack>
            </Stack>
        </Stack>
    )

}
