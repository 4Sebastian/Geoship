import { Paper, Stack, Typography } from '@mui/material'

import StarIcon from '@mui/icons-material/Star'
import React from "react";

export default function Legend() {
    return (
        <Paper elevation={10} sx={{ width: "max-content", padding: 1 }}>
            <Stack direction="row" spacing={1}>
                <StarIcon></StarIcon>
                <Typography>Launch Locations</Typography>
            </Stack>
        </Paper>
    )
}