'use server'
import {Box, IconButton, Link, Stack, Typography} from "@mui/material";
import {getAllLaunchesAndCoordinates} from "@/util/launch/launchUtils";
import React from "react";
import {route} from "@/util/routingUtils";
import RocketInfo from "@/components/rocketInfo/rocketInfo";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export default async function RocketPaginator({page=1}: {page?: number}) {
    const launchesAndCoordinates = await getAllLaunchesAndCoordinates();
    const rocketsPerPage = 3;
    const rocketsLength = launchesAndCoordinates.getLength();
    const PREVIOUS = 1;
    const NEXT = 2;



    const getPaginatorButton = (icon: any, direction: number) => {
        const handleChange = (value: number) => {
            route('/', {page: String(value)});
        }

        return (
            <Link style={{height: 1, padding: 1}} onClick={() => handleChange(direction == PREVIOUS ? page-1 : page+1)}>
                <IconButton sx={{height: 1}}
                            style={{borderRadius: 5}}>
                    {icon}
                </IconButton>
            </Link>
        )
    }

    return (
        <Box sx={{ width: 1, height: '100%', backgroundColor: '#00771c'}} >
            <Stack direction={"column"} sx={{width: 1, height: 1}} justifyContent={"center"} alignItems={"center"} spacing={2}>
                <Typography>Upcoming Launches</Typography>
                <Stack direction={'row'} sx={{width: 1}} justifyContent={"space-between"} alignItems={"center"}>
                    {getPaginatorButton(<ArrowBackIosNewIcon/>, PREVIOUS)}
                    <Stack direction={'row'} sx={{height: 1, width: 1}} justifyContent={"center"} alignItems={"right"} spacing={3}>
                        {new Array<number>(rocketsPerPage).fill(0).map((_: number, index: number) => {
                            const selectedRocketIndex = page - 1 + index;
                            console.log(selectedRocketIndex)
                            return (
                                selectedRocketIndex < rocketsLength ?
                                    <RocketInfo key={index} selectedRocketIndex={selectedRocketIndex}/>
                                    :
                                    <></>
                            )
                        })}
                    </Stack>
                    {getPaginatorButton(<ArrowForwardIosIcon/>, NEXT)}
                </Stack>

            </Stack>
        </Box>
    )
}