import { Box, Paper, Stack, Typography } from '@mui/material'

import StarIcon from '@mui/icons-material/Star'
import React, { useEffect, useState } from "react";
import axios from 'axios';

export default function RocketInfo(props: { selectedRocket: any, address: any , setDistance: Function}) {
    

    async function calculateDistance(){
        var location = encodeURI(props.selectedRocket.pad.name);
        
        var coordinates2: number[] = [];
        var coordinates1 = await axios.get(`https://geocode.maps.co/search?q={${location}}`)
            .then((response) =>{
                var coordinates1: number[] = [];
                coordinates1 = [parseFloat(response.data[0].lat), parseFloat(response.data[0].lon)]
                // coordinates[0] = parseFloat(response.data[0].lon);
                // coordinates[1] = parseFloat(response.data[0].lat);
                // console.log(coordinates[0])
                
                
                

                return coordinates1;
            })

        coordinates2[1] = props.address.geometry.coordinates[0]
        coordinates2[0] = props.address.geometry.coordinates[1]
        console.log(coordinates1[0])
        console.log(coordinates1[1])
        console.log(coordinates2[0])
        console.log(coordinates2[1])
        props.setDistance(getDistanceFromLatLonInMi(coordinates1[0],coordinates1[1],coordinates2[0],coordinates2[1]))
    }

    function getDistanceFromLatLonInMi(lat1: number,lon1: number,lat2: number,lon2: number) {
        var R = 6371; // Radius of the earth in km
        var dLat = deg2rad(lat2-lat1);  // deg2rad below
        var dLon = deg2rad(lon2-lon1); 
        var a = 
          Math.sin(dLat/2) * Math.sin(dLat/2) +
          Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
          Math.sin(dLon/2) * Math.sin(dLon/2)
          ; 
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
        var d = R * c; // Distance in km
        return d* 0.621371;
      }
      
      function deg2rad(deg: number) {
        return deg * (Math.PI/180)
      }

    useEffect(() => {
       
        if(props.address && props.selectedRocket){
            calculateDistance()
        }
    
    }, [props.selectedRocket, props.address])

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
