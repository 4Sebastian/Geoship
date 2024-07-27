'use server'
import {IconButton, Link, Stack, Typography} from "@mui/material";
import {getAllLaunchesAndCoordinates} from "@/util/launch/launchUtils";
import React from "react";
import RocketInfo from "@/components/rocketInfo/rocketInfo";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export default async function RocketPaginator({page=1}: {page: number}) {
    const launchesAndCoordinates = await getAllLaunchesAndCoordinates();
    const rocketsPerPage = 3;
    const rocketsLength = launchesAndCoordinates.getLength();
    const PREVIOUS = -1;
    const NEXT = 1;


    const getPaginatorButton = (icon: any, direction: number) => {
        return (
            <Link style={{height: 1, padding: 1}} href={`/?page=${page+direction}`}>
                <IconButton sx={{height: 1}}
                            style={{borderRadius: 5, color: 'white'}} size="large">
                    {icon}
                </IconButton>
            </Link>
        )
    }

    return (
        <Stack direction={"column"} sx={{width: 1, height: 1}} justifyContent={"center"} alignItems={"center"} spacing={10}>
            <Typography fontFamily={'Trueno'} variant={'h2'} color={'white'}>Upcoming Launches</Typography>
            <Stack direction={'row'} sx={{width: 1}} justifyContent={"space-between"} alignItems={"center"}>
                {getPaginatorButton(<ArrowBackIosNewIcon/>, PREVIOUS)}
                <Stack direction={'row'} sx={{height: 1, width: 1}} justifyContent={"center"} alignItems={"right"} spacing={5}>
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
            {/*<Pagination count={Math.ceil(rocketsLength / rocketsPerPage)} onChange={(_,newPage) => handleChange(newPage)} />*/}
        </Stack>
    )
}