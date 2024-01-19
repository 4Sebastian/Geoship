import { Box, Paper, Stack, Typography } from '@mui/material'

import StarIcon from '@mui/icons-material/Star'
import React, { useEffect, useState } from "react";
import axios from 'axios';

export default function RocketInfo(props: { selectedRocket: any, address: any , setDistance: Function}) {
    return (
        
        <Paper elevation={10} sx={{ padding: 1 }}>
            {props.selectedRocket != null ? <Stack direction="row" sx={{ height: 1, padding: 1 }} spacing={1}>
                {/* <Box component="img" sx={{ width: 'min-content', height: 0.175, objectFit: 'cover', aspectRatio: 1 }}
                    src={`${'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e'}`}
                    loading="lazy"
                >
                </Box> */}

                <Stack direction="column" justifyContent="space-between">
                    <Stack direction="row" spacing={1} justifyContent="space-between" alignItems="center" sx={{ width: 1, height: 1 }}>
                        <Typography variant='h5'>
                            rocket name:
                        </Typography>
                        <Typography variant='h5'>
                            {props.selectedRocket.vehicle.name}
                        </Typography>
                    </Stack>
                    <Stack direction="row" spacing={1} justifyContent="space-between" alignItems="center" sx={{ width: 1, height: 1 }}>
                        <Typography variant='body1'>
                            Launch Location:
                        </Typography>
                        <Typography variant='body1'>
                            {props.selectedRocket.pad.location.name}
                        </Typography>
                    </Stack>
                    <Stack direction="row" spacing={1} justifyContent="space-between" alignItems="center" sx={{ width: 1, height: 1 }}>
                        <Typography variant='body1'>
                            Launch date:
                        </Typography>
                        <Typography variant='body1'>
                            blurb
                        </Typography>
                    </Stack>
                    <Stack direction="row" spacing={1} justifyContent="space-between" alignItems="center" sx={{ width: 1, height: 1 }}>
                        <Typography variant='body1'>
                            Time until launch:
                        </Typography>
                        <Typography variant='body1'>
                            blurb
                        </Typography>
                    </Stack>
                </Stack>
            </Stack> : <Typography noWrap>Select a Rocket!</Typography>}
        </Paper>
    )
}
