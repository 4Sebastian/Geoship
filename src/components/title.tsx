'use server'

import {Box, Stack, Typography} from "@mui/material";
import Image from "next/image";

export default async function Title(){
   return (
       <Box sx={{ width: 1, height: '100%'}} >
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
   )
}