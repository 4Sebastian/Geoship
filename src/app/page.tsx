"use server";
import {Box, Button, Stack, Typography} from '@mui/material'

import Image from "next/image";


export default async function Home() {

    return (
        <Box sx={{ width: 1, height: 1, backgroundColor: '#242430' }}>
            <Stack direction="row" sx={{width: 1, height: 1}} justifyContent="center">
                <Box sx={{width: 'fit-content', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <Typography fontFamily="Trueno" align="center" variant="h1" component="div" sx={{color: 'white'}} noWrap>Welcome to</Typography>
                </Box>
                <Box sx={{width: 0.25, position: 'relative'}}>
                    <Image style={{ objectFit: "contain" }}
                           src={"/GeoshipNoTitle.jpg"}
                           alt={"GeoShip Banner"}
                           fill
                           loading="eager"
                           sizes="33vw"
                           priority/>
                </Box>
                <Box sx={{width: 'fit-content', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <Typography fontFamily="Trueno" variant="h1" component="div" sx={{color: 'white'}}>GEOShip</Typography>
                </Box>
            </Stack>

            <Box sx={{position: 'absolute', bottom: 20, left: "50%", translate: "-50%", width: 'fit-content', zIndex: 1}}>
                <Button variant="contained" href="/map" color="primary">Go to Map</Button>
            </Box>
        </Box>
    )
}
