import { Paper, Stack, Typography } from '@mui/material'
import React from "react";
import { Variant } from '@mui/material/styles/createTypography';

export default function RocketInfo(props: { selectedRocket: any }) {

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
        <Paper elevation={10} sx={{ padding: 1 }}>
            {props.selectedRocket != null ? <Stack direction="row" sx={{ height: 1, padding: 1 }} spacing={1}>
                <Stack direction="column" justifyContent="space-between">
                    {getRow('h5', 'Rocket Name:', props.selectedRocket.vehicle.name)}
                    {getRow('body1', 'Launch Location:', props.selectedRocket.pad.location.name)}
                    {getRow('body1', 'Launch Date:', "blurb")}
                    {getRow('body1', 'Time until launch:', "blurb")}
                </Stack>
            </Stack> : <Typography noWrap>Select a Rocket!</Typography>}
        </Paper>
    )
}
