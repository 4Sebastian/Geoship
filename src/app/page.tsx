"use server";
import {Box, Button} from '@mui/material'

import Title from "@/components/title";
import Footer from "@/components/footer";
import Contact from "@/components/contact";
import RocketPaginator from "@/components/rocketInfo/rocketPaginator";
import {URLSearchParamsType} from "@/util/routingUtils";


export default async function Home({
                                       searchParams,
                                   }: {
    searchParams: URLSearchParamsType
}) {
    var pageString = searchParams["page"];
    var pageNumber = 1;
    if(typeof pageString === "string") {
        const parsedIndex = Number(pageString as string);

        if(!isNaN(parsedIndex)) {
            pageNumber = parsedIndex;
        }
    }

    return (
        <Box sx={{ width: 1, height: 1, backgroundColor: '#242430' ,overflowY:'auto'}}>
            <Title/>
            <RocketPaginator page={pageNumber}/>
            <Contact/>
            <Footer/>
            <Box sx={{position: 'absolute', bottom: 20, left: "50%", translate: "-50%", width: 'fit-content', zIndex: 1}}>
                <Button variant="contained" href="/map" color="primary">Go to Map</Button>
            </Box>
        </Box>
    )
}
