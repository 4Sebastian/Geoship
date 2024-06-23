import { Box, List, ListItem, ListItemText, Paper, Stack, Typography } from '@mui/material'

import React, { useState, useEffect } from "react";
import {getAllLaunchesAndCoordinates} from "@/util/launchUtils";
import LaunchListHoverItem from "@/components/launchListHoverItem";

export default function LaunchList() {
    const [hoveredItem, setHoveredItem] = useState<any>(null);
    const [estimatedDate, setEstimatedDate] = useState<any>(undefined);
    const [ticking, setTicking] = useState(false);

    const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
    const [images, setImages] = useState<{ [key: string]: string }>({});
    const [launches, setLaunches] = useState<any[]>([]);

    // const GOOGLE_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
    // const GOOGLE_CX = process.env.NEXT_PUBLIC_GOOGLE_CX;

    function handleMouseMove(e: { clientX: any; clientY: any; }) {
        setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    useEffect(() => {
        getAllLaunchesAndCoordinates().then(res => {
            setLaunches(res.rockets);
            // fetchAllImages(res.rockets);
            console.log("Got launches and coordinates")
        }).catch(error => console.log(error));
    }, []);

    function handleHover(value: any) {
        setHoveredItem(value);
        if (value) {
            setEstimatedDate(value.t0);
            setTicking(true);
        } else {
            setEstimatedDate(undefined);
            setTicking(false);
        }
    }

    function handleClick(value: any, index: number) {
        location.assign(`/?selectedRocketIndex=${index}`);
    }

    // async function fetchImage(query: string) {
    //     try {
    //         const response = await fetch(`https://www.googleapis.com/customsearch/v1?key=${GOOGLE_API_KEY}&cx=${GOOGLE_CX}&q=${query}&searchType=image&num=1`);
    //         const data = await response.json();
    //
    //         if (data.items && data.items.length > 0) {
    //             return data.items[0].link;
    //         } else {
    //             return 'https://via.placeholder.com/150';
    //         }
    //     } catch (error) {
    //         console.error('Error fetching image:', error);
    //         return 'https://via.placeholder.com/150';
    //     }
    // }
    //
    // async function fetchAllImages(rockets: any[]) {
    //     const imagePromises = rockets.map((rocket) => fetchImage(rocket.vehicle.name + "-rocket"));
    //     const images = await Promise.all(imagePromises);
    //     const imageMap: { [key: string]: string } = {};
    //     rockets.forEach((rocket, index) => {
    //         imageMap[rocket.vehicle.name] = images[index];
    //     });
    //     setImages(imageMap);
    // }

    return ( 
        <Paper elevation={10} sx={{ height: "400px", pointerEvents: "auto", overflowY: "auto" }}>
            <Stack direction="column">
                <Paper elevation={2} sx={{ padding: 1 }}>
                    <Typography>Upcoming Launches</Typography>
                </Paper>




                <List style={{ overflowY: 'auto' }}>
                    {launches.length == 0 ?
                        <ListItem key="loading">
                            <ListItemText primary={`Loading...`} />
                        </ListItem>
                        :
                        launches.map((value: { id: React.Key | null | undefined; vehicle: { name: any; }; }, index: number) => (
                            <ListItem
                                key={index}
                                onMouseMove={handleMouseMove}
                                onMouseEnter={() => handleHover(value)}
                                onMouseLeave={() => handleHover(null)}
                                onMouseDown={() => handleClick(value, index)}>
                                <ListItemText primary={`Rocket: ${value.vehicle.name}`} />

                            </ListItem>
                        ))}
                </List>
            </Stack>

            <LaunchListHoverItem  cursorPosition={cursorPosition} estimatedDate={estimatedDate} hoveredItem={hoveredItem} images={images} ticking={ticking}/>
        </Paper >
    )
}