"use server";
import {Box, Button, Link, Paper, Stack, TextField, Typography} from '@mui/material'

import Image from "next/image";
import Grid2 from "@mui/material/Unstable_Grid2";


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
            <Box sx={{ width: 1, height: '100%'}} >
                <Box sx={{ width: 1, height: 1}} display={'flex'} justifyContent={'center'} alignItems={'center'}>
                    <Stack direction={'column'} sx={{width: 1}} justifyContent={'center'} alignItems={'center'} spacing={20}>
                        <Typography fontFamily={'Trueno'} variant={'h2'} color={'white'}>Contact Us</Typography>
                        <Stack direction={'row'} sx={{width: 1, height: 1}} alignItems={'center'}>
                            <Box sx={{ width: 0.5, height: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <Typography sx={{padding: 2}} align={'center'} variant={'h5'} color={'white'}>
                                    At GEOShip, feedback and customer support is our top priority.
                                    If there is anything thats missing or greatly enjoyed,
                                    feel free to contact the GEOShip team with feedback, wanted features, bugs, general thanks, anything!
                                </Typography>
                            </Box>
                            <Box sx={{ width: 0.5, height: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 2 }}>
                                <Stack direction={'column'} spacing={2} alignItems={'center'}>
                                    <Paper sx={{padding: 2}}>
                                        <Grid2 container spacing={2}>
                                            <Grid2 xs={6}>
                                                <TextField label={'Name'} fullWidth></TextField>
                                            </Grid2>
                                            <Grid2 xs={6}>
                                                <TextField label={'Email'} fullWidth></TextField>
                                            </Grid2>
                                            <Grid2 xs={12}>
                                                <TextField label={"Description"} multiline fullWidth minRows={4}></TextField>
                                            </Grid2>
                                        </Grid2>
                                    </Paper>
                                    <Button color={'primary'} variant={'contained'}>Send</Button>
                                </Stack>
                            </Box>
                        </Stack>
                    </Stack>
                </Box>
            </Box>
            <Box sx={{ width: 1, height: '75px', backgroundColor: '#363645', padding: 2}} >
                <Stack sx={{width: 1, height: 1}} direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
                    <Link href={'/map'} sx={{color: 'white'}} variant={'body2'}>Map</Link>

                    <Typography variant={'body1'} color={'white'}>© GEOShip LLC</Typography>
                </Stack>
            </Box>

            <Box sx={{position: 'absolute', bottom: 20, left: "50%", translate: "-50%", width: 'fit-content', zIndex: 1}}>
                <Button variant="contained" href="/map" color="primary">Go to Map</Button>
            </Box>
        </Box>
    )
}
