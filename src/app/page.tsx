'use client';
import { Box, Stack } from '@mui/material'

import React, { useState } from "react";
// import MapContainer from '@/components/mapContainer';
import Address from '@/components/address';
import LaunchList from '@/components/launchList';
import RocketInfo from '@/components/rocketInfo';
import Distance from '@/components/distanceToRocket';
import { Coordinate } from 'ol/coordinate';

import dynamic from 'next/dynamic'

const MapContainer = dynamic(
	() => import('@/components/mapContainer'),
	{ ssr: false }
)


export default function Home() {
	const [address, setAddress] = useState(undefined)
	const [selectedRocket, setSelectedRocket] = useState<any>(null);
	const [selectedRocketIndex, setSelectedRocketIndex] = useState<number>();

	return (
		<Box sx={{ width: "100vw", height: "100vh", pointerEvents: "none" }}>
			<Stack direction="column" justifyContent="space-between" sx={{ width: 1, height: 1, position: "relative", zIndex: 2 }}>
				<Stack direction="row" justifyContent="space-between" sx={{ padding: 3 }}>
					<LaunchList setSelectedRocket = {setSelectedRocket} setSelectedRocketIndex = {setSelectedRocketIndex}/>
					<Address setAddress={setAddress}/>
				</Stack>
				<Stack direction="row" justifyContent="space-between" alignItems="flex-end" sx={{ width: 1, padding: 3 }}>
					<Distance selectedRocket = {selectedRocket} selectedRocketIndex={selectedRocketIndex} address={address}/>
					<RocketInfo selectedRocket = {selectedRocket} address = {address}/>
				</Stack>
			</Stack>
			<Box sx={{ position: "absolute", top: 0, right: 0, width: 1, height: 1, zIndex: 1, pointerEvents: "auto" }}>
				<MapContainer address={address} selectedRocketIndex = {selectedRocketIndex} />
			</Box>
		</Box>
	)
}
