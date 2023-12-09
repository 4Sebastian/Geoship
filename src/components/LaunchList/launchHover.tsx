import { Box, Paper, Stack, Typography } from '@mui/material'

import React, { useState, useEffect } from "react";
import { Variant } from '@mui/material/styles/createTypography';
import { getDate, getTimeTillLaunch } from './dateUtils';

export default function LaunchHover(props: { hoveredItem: any | undefined, estimatedDate: string, ticking: boolean }) {
    const [count, setCount] = useState<number>(0)
    const [estimatedDateString, setEstimatedDateString] = useState<string>("");
    const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e: { clientX: any; clientY: any; }) => {
            setCursorPosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => { window.removeEventListener('mousemove', handleMouseMove);};
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => props.ticking && setCount(count + 1), 1e3)
        setEstimatedDateString(getTimeTillLaunch(props.estimatedDate));
        return () => clearTimeout(timer)
    }, [count, props.ticking, props.estimatedDate])

    function getRow(variant: Variant, label: string, info: string) {
        return (
            <Stack direction="row" spacing={1} justifyContent="space-between" alignItems="center" sx={{ width: 1, height: 1 }}>
                <Typography variant={variant}>
                    {label}
                </Typography>
                <Typography variant={variant}>
                    {info}
                </Typography>
            </Stack>
        )
    }

    return (
        props.hoveredItem && (
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
                        loading="lazy">
                    </Box>

                    <Stack direction="column" justifyContent="space-between">
                        {getRow('h5', 'Rocket Name:', props.hoveredItem.vehicle.name)}
                        {getRow('body1', 'Launch Location:', props.hoveredItem.pad.location.name)}
                        {getRow('body1', 'Launch Date:', getDate(props.hoveredItem.est_date))}
                        {getRow('body1', 'Time until launch::', estimatedDateString)}
                    </Stack>
                </Stack>
            </Paper>
        )
    )
}