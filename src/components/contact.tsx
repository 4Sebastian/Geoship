'use server'

import {Box, Button, Paper, Stack, TextField, Typography} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";

export default async function Contact() {
    return (
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
    )
}