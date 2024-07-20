"use server";
import {Box, Button, Stack, Typography} from '@mui/material'

import Image from "next/image";


export default async function Home() {

    return (
        <Box sx={{ width: 1, height: 1, backgroundColor: '#242430' ,overflowY:'auto'}}>
            <Box sx={{ width: 1, height: '100%'}} >
                {/*<Typography>Title Section</Typography>*/}
                <Stack direction={'row'} sx={{width:1, height:1,padding:2}} spacing={2}>
                    <Box sx={{width: 0.5, height: 1, display:'flex', alignItems:'center', justifyContent:'center'}}>
                        <Stack direction={"column"}>
                            <Typography sx={{color:'white'}} fontFamily='Trueno' variant={'h1'}>Welcome to</Typography>
                            <Typography sx={{color:'white'}} fontFamily='Trueno' variant={'h1'}>GEOShip</Typography>
                        </Stack>
                    </Box>

                    <Box sx={{width:0.5, height:1, display:'flex', alignItems:'center', justifyContent:'center'}}>
                        <Box sx={{width: 1, height: 0.75, position: 'relative'}}>
                            <Image style={{ objectFit: "contain" }}
                                   src={"/GeoshipNoTitle.jpg"}
                                   alt={"GeoShip Banner"}
                                   fill
                                   loading="eager"
                                   sizes="50%"
                                   priority/>
                        </Box>
                    </Box>
                </Stack>
            </Box>
            {/*<Box sx={{ width: 1, height: '100%', backgroundColor: '#00771c'}} >*/}
            {/*    <Typography>Rocket Image Pagination</Typography>*/}
            {/*</Box>*/}
            {/*<Box sx={{ width: 1, height: '100%', backgroundColor: '#08e2ff'}} >*/}
            {/*    <Typography>Contact Me Section</Typography>*/}
            {/*</Box>*/}
            {/*<Box sx={{ width: 1, height: '100%', backgroundColor: '#13c110'}} >*/}
            {/*    <Typography>Copy Right & Links</Typography>*/}
            {/*</Box>*/}

            <Box sx={{position: 'absolute', bottom: 20, left: "50%", translate: "-50%", width: 'fit-content', zIndex: 1}}>
                <Button variant="contained" href="/map" color="primary">Go to Map</Button>
            </Box>
        </Box>
    )
}
