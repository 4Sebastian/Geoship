"use server";
import {Box, Button, Stack, Typography} from '@mui/material'

import Image from "next/image";


export default async function Home() {

    return (
        <Box sx={{ width: 1, height: 1, backgroundColor: '#242430' }}>
            <Stack direction="row" sx={{width: 1, height: 1}}>
                <Box sx={{width: 0.5, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>

                    <Typography variant="h1" component="div" sx={{color: 'white'}}>Welcome to</Typography>
                </Box>
                <Box sx={{width: 1, position: 'relative'}}>
                    <Image style={{ objectFit: "contain" }}
                           src={"/GeoShipBannerTransparent.png"}
                           alt={"GeoShip Banner"}
                           fill
                           loading="eager"
                           sizes="33vw"
                           priority/>
                </Box>
            </Stack>

            <Box sx={{position: 'absolute', bottom: 20, left: "50%", translate: "-50%", width: 'fit-content', zIndex: 1}}>
                <Button variant="contained" href="/map" color="primary">Go to Map</Button>
            </Box>
        </Box>
    )
}
