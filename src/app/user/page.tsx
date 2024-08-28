"use server";
import { Box, Button, Grid, Paper, Stack, Typography } from '@mui/material'
import Image from 'next/image';
import React from 'react';

export default async function Home({
}: {
  }) {

  return (
    <Box sx={{ width: 1, height: 1, backgroundColor: '#242430', overflowY: 'auto' }}>
      <Stack sx={{ width: 1, height: 1, padding: 1 }} justifyContent={'center'} alignItems={'center'}>
        <Paper sx={{ width: '800px', height: 1, padding: 1 }}>
          <Image src="https://placehold.co/800x200/png" width={800} height={200} style={{ borderRadius: '5px' }} alt='profile picture' />
          <Stack sx={{ width: 1, height: 'calc(100% - 200px)' }} justifyContent={'space-between'} alignItems={'center'}>
            <Grid container>
              <Grid item xs={6}>
                <Typography>First Name</Typography>
              </Grid>
              <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'end' }}>
                <Typography>Lala</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>Last Name</Typography>
              </Grid>
              <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'end' }}>
                <Typography>Land</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>Username</Typography>
              </Grid>
              <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'end' }}>
                <Typography>Lala_Land</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>Email</Typography>
              </Grid>
              <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'end' }}>
                <Typography>lala@land.com</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>Password</Typography>
              </Grid>
              <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'end' }}>
                <Button variant='contained'>Change Password</Button>
              </Grid>
            </Grid>
            <Stack sx={{ width: 1 }} justifyContent={'end'} direction='row' spacing={2}>
              <Button variant='contained'>Log Out</Button>
              <Button variant='contained' color='error'>Delete Account</Button>
            </Stack>
          </Stack>
        </Paper>
      </Stack>
    </Box>
  )
}
