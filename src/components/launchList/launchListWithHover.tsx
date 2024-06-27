"use client"
import { Box, List, ListItem, ListItemText, Paper, Stack, Typography } from '@mui/material'

import React, { useState } from "react";
import LaunchListHoverItem from "@/components/launchList/launchListHoverItem";
import {RocketObj} from "@/util/launch/launchDefinitions";

export default function LaunchListWithHover({ launches }:{ launches: RocketObj[]}) {
    const [hoveredItem, setHoveredItem] = useState<RocketObj | null>(null);
    const [estimatedDate, setEstimatedDate] = useState<any>(undefined);
    const [ticking, setTicking] = useState(false);

    const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
    const [images, setImages] = useState<{ [key: string]: string }>({});

    // const GOOGLE_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
    // const GOOGLE_CX = process.env.NEXT_PUBLIC_GOOGLE_CX;

    function handleMouseMove(e: { clientX: any; clientY: any; }) {
        setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    function handleHover(value: RocketObj | null) {
        setHoveredItem(value);
        if (value) {
            setEstimatedDate(value.launchDate);
            setTicking(true);
        } else {
            setEstimatedDate(undefined);
            setTicking(false);
        }
    }

    function handleClick(value: any, index: number) {
        location.assign(`/map/?selectedRocketIndex=${index}`);
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
        <>
            <List style={{ overflowY: 'auto' }}>
                {
                    launches.map((value, index: number) => (
                        <ListItem
                            key={index}
                            onMouseMove={handleMouseMove}
                            onMouseEnter={() => handleHover(value)}
                            onMouseLeave={() => handleHover(null)}
                            onMouseDown={() => handleClick(value, index)}>
                            <ListItemText primary={`Rocket: ${value.vehicle.name}`} />

                        </ListItem>
                    ))
                }
            </List>
            <LaunchListHoverItem  cursorPosition={cursorPosition} estimatedDate={estimatedDate} hoveredItem={hoveredItem} images={images} ticking={ticking}/>
        </>
    )
}