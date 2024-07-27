import {Box, List, ListItem, ListItemText, Paper, Stack, Typography} from '@mui/material'

import React, {useState, useEffect, useCallback} from "react";
import {RocketObj} from "@/util/launch/launchDefinitions";

export default function LaunchListHoverItem(props: {
    cursorPosition: { x: number, y: number },
    hoveredItem: RocketObj | null | undefined,
    images: { [key: string]: string },
    estimatedDate: any,
    ticking: boolean
}) {
    const [count, setCount] = useState(0);
    const [estimatedDateString, setEstimatedDateString] = useState<string>("");



    function getDate(est_date: any) {
        var date = new Date(est_date.year, est_date.month - 1, est_date.day)

        return date.toDateString()
    }

    const getTimeTillLaunch = useCallback(() => {

        if (props.estimatedDate != undefined) {
            //"2023-10-26T03:14Z"
            var date = new Date(props.estimatedDate)
            var today = new Date(Date.now());

            var difference = date.getTime() - today.getTime();
            //var diffDate = new Date(difference)

            var seconds = Math.floor(difference / 1000);
            var minutes = Math.floor(seconds / 60);
            var hours = Math.floor(minutes / 60);
            var days = Math.floor(hours / 24);

            hours %= 24;
            minutes %= 60;
            seconds %= 60;


            if (difference <= 0) {
                setEstimatedDateString(`Right Now!`);
                return 'Right Now!'
            }
            setEstimatedDateString(`${days}d:${hours}h:${minutes}m:${seconds}s`);
            //setEstimatedDateString(`${days}d:${hours}h:${minutes}m:${seconds}s`);
            return `${days}d:${hours}h:${minutes}m:${seconds}s`;
        } else {
            return ''
        }


    },[props.estimatedDate]);

    useEffect(() => {
        if (props.estimatedDate != undefined) {
            getTimeTillLaunch()
        }
    }, [props.estimatedDate, getTimeTillLaunch])


    useEffect(() => {
        const timer = setTimeout(() => props.ticking && setCount(count + 1), 1e3)
        getTimeTillLaunch();
        return () => clearTimeout(timer)
    }, [count, props.ticking, getTimeTillLaunch])


    return (

                props.hoveredItem ? (
                    <Paper elevation={5} sx={{
                        position: 'fixed',
                        top: props.cursorPosition.y + 10 + 'px',
                        left: props.cursorPosition.x + 10 + 'px',
                        width: 'max-content',
                        height: 0.175
                    }}>
                        <Stack direction="row" sx={{height: 1, padding: 1}} spacing={1}>
                            <Box component="img" sx={{objectFit: 'cover', aspectRatio: 1}}
                                 src={props.images[props.hoveredItem.vehicle.name] || 'https://via.placeholder.com/150'}
                                 alt={props.hoveredItem.vehicle.name}
                                 loading="lazy"
                            >

                            </Box>

                            <Stack direction="column" justifyContent="space-between">
                                <Stack direction="row" spacing={1} justifyContent="space-between" alignItems="center"
                                       sx={{width: 1, height: 1}}>
                                    <Typography variant='h5'>
                                        rocket name:
                                    </Typography>
                                    <Typography variant='h5'>
                                        {props.hoveredItem.vehicle.name}
                                    </Typography>
                                </Stack>
                                <Stack direction="row" spacing={1} justifyContent="space-between" alignItems="center"
                                       sx={{width: 1, height: 1}}>
                                    <Typography variant='body1'>
                                        Launch Location:
                                    </Typography>
                                    <Typography variant='body1'>
                                        {props.hoveredItem.pad.locationName}
                                    </Typography>
                                </Stack>
                                <Stack direction="row" spacing={1} justifyContent="space-between" alignItems="center"
                                       sx={{width: 1, height: 1}}>
                                    <Typography variant='body1'>
                                        Launch date:
                                    </Typography>
                                    <Typography variant='body1'>
                                        {getDate(props.hoveredItem.launchDateDetails)}
                                    </Typography>
                                </Stack>
                                <Stack direction="row" spacing={1} justifyContent="space-between" alignItems="center"
                                       sx={{width: 1, height: 1}}>
                                    <Typography variant='body1'>
                                        Time until launch:
                                    </Typography>
                                    <Typography variant='body1'>
                                        {estimatedDateString}
                                    </Typography>
                                </Stack>
                            </Stack>
                        </Stack>
                    </Paper>
                ) : <></>

    )
}