"use server"
import {Box, Divider, Paper, Stack, Typography} from '@mui/material'
import {getAllLaunchesAndCoordinates} from "@/util/launch/launchUtils";
import {ReactJSXElement} from "@emotion/react/types/jsx-namespace";
import {ComplexRocket} from "@/util/launch/launchDefinitions";
import Image from "next/image";
import FakeRocketImage from "@/test/fakeRocketImage.png";
import TrackRocketButton from "@/components/rocketInfo/trackRocketButton";

export default async function RocketInfo(props: { selectedRocketIndex: number, address: any }) {
    const launchesAndCoordinates = await getAllLaunchesAndCoordinates();
    const launches = launchesAndCoordinates.getComplexRockets();

    const wrapper = (children: ReactJSXElement) => {
        return <Paper elevation={10}>{children}</Paper>
    }

    if (launches.length < props.selectedRocketIndex) {
        return wrapper(<Typography noWrap sx={{margin: 1}}>Select a Rocket!</Typography>)
    }

    const launch: ComplexRocket = launches[props.selectedRocketIndex];
    return wrapper(
            <Stack direction="column" sx={{height: 1, width: 'min-content', pointerEvents: "auto" }}>
                <Stack direction="row" sx={{padding: 1}} justifyContent={"space-between"} alignItems={"center"}>
                    <Stack direction="row" spacing={1}>
                        <Typography fontFamily="Trueno" variant="h5">{launch.vehicle.name}</Typography>
                        <Divider variant="middle" orientation="vertical" flexItem/>
                        <Typography variant={"h6"}>{launch.provider.name}</Typography>
                    </Stack>
                    <TrackRocketButton/>
                </Stack>

                <Box sx={{width: "400px", height: "300px", position: "relative"}}>
                    <Image src={FakeRocketImage} alt="Rocket Image" fill objectFit="cover"/>
                </Box>

                <Stack direction="row" sx={{padding: 1}}>
                    <Stack sx={{width: 1}}>
                        <Typography fontFamily="Trueno" variant="body1">Launch Location</Typography>
                        <Typography  variant='body2'>
                            {launch.pad.locationName}
                        </Typography>
                    </Stack>
                    <Stack sx={{width: 1}} alignItems="end">
                        <Typography fontFamily="Trueno" variant="body1">Launch Date</Typography>
                        <Typography  variant='body2'>
                            {launch.launchDate.toDateString()}
                        </Typography>
                    </Stack>
                </Stack>

                <Box sx={{width: 1, padding: 1}}>
                    <Typography fontFamily="Trueno" variant="body1">Description</Typography>
                    <Typography  variant='body2'>
                        {launch.launchDescription}
                    </Typography>
                </Box>

            </Stack>
    )

}
