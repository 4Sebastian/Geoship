"use server";
import {Box, Button} from '@mui/material'

import Title from "@/components/title";
import Footer from "@/components/footer";
import Contact from "@/components/contact";
import RocketPaginator from "@/components/rocketInfo/rocketPaginator";


export default async function Home() {

    return (
        <Box sx={{ width: 1, height: 1, backgroundColor: '#242430' ,overflowY:'auto'}}>
            <Title/>
            {/*<RocketPaginator/>*/}
            <Contact/>
            <Footer/>
            <Box sx={{position: 'absolute', bottom: 20, left: "50%", translate: "-50%", width: 'fit-content', zIndex: 1}}>
                <Button variant="contained" href="/map" color="primary">Go to Map</Button>
            </Box>
        </Box>
    )
}
