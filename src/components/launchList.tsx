import { Box, Grid, List, ListItem, ListItemText, Paper, Stack, Tooltip, Typography } from '@mui/material'

import React, { useState, useEffect } from "react";
import axios from 'axios';

export default function LaunchList() {
    const [launches, setLaunches] = useState<any[]>([]);
    const [coordinates, setCoordinates] = useState<number[][]>();
    const [hoveredItem, setHoveredItem] = useState<any>(null);
    const [estimatedDate, setEstimatedDate] = useState<any>(undefined);
    const [ticking, setTicking] = useState(false),
        [count, setCount] = useState(0)
    const [estimatedDateString, setEstimatedDateString] = useState<string>("");
    const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        axios.get('https://fdo.rocketlaunch.live/json/launches/next/5')
            .then(async function (response) {
                var rockets = []
                var coordinates: number[][] = [];
                var fixes: {index: number, location: string}[] = [];
                console.log(response)
                for (let index = 0; index < response.data.count; index++) {
                    await new Promise(res => setTimeout(res, 1000)).then(() => {
                        var location = encodeURI(response.data.result[index].pad.name + ' ' + response.data.result[index].pad.location.name)
                        console.log(location)
                        axios.get(`https://geocode.maps.co/search?q={${location}}`)
                            .then(function (response2) {
                                console.log(response2)
                                if(response2.data && response2.data.length > 0){
                                    coordinates[index] = [response2.data[0].lat, response2.data[0].lon]
                                }else{
                                    fixes.push({index: index, location: response.data.result[index].pad.location.name})
                                }
                                
                            })
                    });
                    rockets[index] = response.data.result[index]
                }
                
                for (let index = 0; index < fixes.length; index++) {
                    await new Promise(res => setTimeout(res, 1000)).then(() => {
                        var location = encodeURI(fixes[index].location)
                        console.log(location)
                        axios.get(`https://geocode.maps.co/search?q={${location}}`)
                            .then(function (response2) {
                                console.log(response2)
                                if(response2.data && response2.data.length > 0){
                                    coordinates[index] = [response2.data[0].lat, response2.data[0].lon]
                                }else{
                                    console.log("Impossible")
                                }
                                
                            })
                    });
                }

                setLaunches(rockets);
                setCoordinates(coordinates);
            })
            .catch(function (error) {
                console.log(error);
            })

        const handleMouseMove = (e: { clientX: any; clientY: any; }) => {
            setCursorPosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    function getDate(est_date: any){
        var date = new Date(est_date.year, est_date.month-1, est_date.day)
        console.log(est_date.year, est_date.month-1, est_date.day)
        //console.log(date);

        return date.toDateString()
    }

    function handleHover(value: any){
        setHoveredItem(value)
        if(value){
            setEstimatedDate(value.t0)
            setTicking(true)
        }else{
            setEstimatedDate(undefined)
            setTicking(false)
        }
    }

    useEffect(() => {
        if(estimatedDate != undefined){
            getTimeTillLaunch()
        }
    }, [estimatedDate])

    
   
   useEffect(() => {
    const timer = setTimeout(() => ticking && setCount(count+1), 1e3)
    getTimeTillLaunch();
    return () => clearTimeout(timer)
   }, [count, ticking])


    function getTimeTillLaunch(){
       
        if(estimatedDate != undefined){
            //"2023-10-26T03:14Z"
            var date = new Date(estimatedDate)
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

            

            // console.log(new Date(difference))
            setEstimatedDateString(`${days}d:${hours}h:${minutes}m:${seconds}s`);
            //setEstimatedDateString(`${days}d:${hours}h:${minutes}m:${seconds}s`);
            return `${days}d:${hours}h:${minutes}m:${seconds}s`;
        }else{
            return ''
        }
        

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
                        launches.map((value) => (
                            <ListItem
                                key={value.id}
                                onMouseEnter={() => handleHover(value)}
                                onMouseLeave={() => handleHover(null)}>
                                <ListItemText primary={`Rocket: ${value.vehicle.name}`} />

                            </ListItem>
                        ))}
                </List>
            </Stack>

            {
                hoveredItem && (
                    <Paper elevation={5} sx={{
                        position: 'fixed',
                        top: cursorPosition.y + 10 + 'px',
                        left: cursorPosition.x + 10 + 'px',
                        width: 'max-content',
                        height: 0.175
                    }}>
                        <Stack direction="row" sx={{ height: 1, padding: 1 }} spacing={1}>
                            <Box component="img" sx={{ objectFit: 'cover', aspectRatio: 1 }}
                                src={`${'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e'}`}
                                loading="lazy"
                            >

                            </Box>

                            <Stack direction="column" justifyContent="space-between">
                                <Stack direction="row" spacing={1} justifyContent="space-between" alignItems="center" sx={{ width: 1, height: 1 }}>
                                    <Typography variant='h5'>
                                        rocket name:
                                    </Typography>
                                    <Typography variant='h5'>
                                        {hoveredItem.vehicle.name}
                                    </Typography>
                                </Stack>
                                <Stack direction="row" spacing={1} justifyContent="space-between" alignItems="center" sx={{ width: 1, height: 1 }}>
                                    <Typography variant='body1'>
                                        Launch Location:
                                    </Typography>
                                    <Typography variant='body1'>
                                        {hoveredItem.pad.location.name}
                                    </Typography>
                                </Stack>
                                <Stack direction="row" spacing={1} justifyContent="space-between" alignItems="center" sx={{ width: 1, height: 1 }}>
                                    <Typography variant='body1'>
                                        Launch date:
                                    </Typography>
                                    <Typography variant='body1'>
                                        {getDate(hoveredItem.est_date)}
                                    </Typography>
                                </Stack>
                                <Stack direction="row" spacing={1} justifyContent="space-between" alignItems="center" sx={{ width: 1, height: 1 }}>
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
                )
            }
        </Paper >
    )
}