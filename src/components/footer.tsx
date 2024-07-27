'use server'

import {Box, Link, Stack, Typography} from "@mui/material";

export default async function Footer() {
    return (
        <Box sx={{ width: 1, height: '75px', backgroundColor: '#363645', padding: 2}} >
            <Stack sx={{width: 1, height: 1}} direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
                <Link href={'/map'} sx={{color: 'white'}} variant={'body2'}>Map</Link>

                <Typography variant={'body1'} color={'white'}>© GEOShip LLC</Typography>
            </Stack>
        </Box>
    )
}