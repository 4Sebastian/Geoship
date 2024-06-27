'use server';
import { Box } from '@mui/material'

import {getAllLaunchesAndCoordinates} from "@/util/launchUtils";
import dynamic from "next/dynamic";
import {AddressSuggestion} from "@/util/addressUtils";

const MapContainer = dynamic(
    () => import('@/components/map/mapContainer'),
    { ssr: false }
)

export default async function Map({address, selectedRocketIndex}: { address: AddressSuggestion | undefined, selectedRocketIndex: any }) {

    const launchesAndCoordinates = await getAllLaunchesAndCoordinates();
    const coords = launchesAndCoordinates.coords;

    return (
        <Box sx={{ position: "absolute", top: 0, right: 0, width: 1, height: 1, zIndex: 1, pointerEvents: "auto" }}>
            <MapContainer address={address} selectedRocketIndex={selectedRocketIndex} coords={coords}/>
        </Box>
    )
}
