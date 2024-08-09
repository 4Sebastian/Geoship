'use server'
import { Stack, Typography } from "@mui/material";
import { getAllLaunchesAndCoordinates } from "@/util/launch/launchUtils";
import React from "react";
import { LaunchesObj } from "@/util/launch/launchDefinitions";
import SegmentedRocketPaginator from "./rocketPaginator/segmentedRocketPaginator";
import ContinuousRocketPaginator from "./rocketPaginator/continuousRocketPaginator";

export default async function RocketPaginator({ page = 1, continuous = false }: { page: number, continuous?: boolean }) {
    const launchesAndCoordinates: LaunchesObj = await getAllLaunchesAndCoordinates();

    return (
        <Stack direction={"column"} sx={{ width: 1, height: 1 }} justifyContent={"center"} alignItems={"center"} spacing={10}>
            <Typography fontFamily={'Trueno'} variant={'h2'} color={'white'}>Upcoming Launches</Typography>
            <Stack direction={'row'} sx={{ width: 1 }} justifyContent={"space-between"} alignItems={"center"}>
                {continuous ?
                    <ContinuousRocketPaginator launchesAndCoordinates={launchesAndCoordinates} /> :
                    <SegmentedRocketPaginator launchesAndCoordinates={launchesAndCoordinates} page={page} />
                }
            </Stack>
            {/*<Pagination count={Math.ceil(rocketsLength / rocketsPerPage)} onChange={(_,newPage) => handleChange(newPage)} />*/}
        </Stack>
    )
}
