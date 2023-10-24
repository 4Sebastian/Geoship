'use client';
import { Box, Stack } from '@mui/material'

import React, { useEffect, useState } from "react";
import MapContainer from '@/components/mapContainer';
import Address from '@/components/address';
import LaunchList from '@/components/launchList';
import Legend from '@/components/legend';

export default function Home() {
	const [address, setAddress] = useState(undefined)
	const [coordinates, setCoordinates] = useState(undefined)

	useEffect(() => {
		console.log(address)
	}, [address])

	useEffect(() => {
		console.log(coordinates)
	}, [coordinates])

	return (
		<Box sx={{ width: "100vw", height: "100vh", pointerEvents: "none" }}>
			<Stack direction="column" justifyContent="space-between" sx={{ width: 1, height: 1, position: "relative", zIndex: 2 }}>
				<Stack direction="row" justifyContent="space-between" sx={{ padding: 3 }}>
					<LaunchList setCoordinates={setCoordinates}/>
					<Address setAddress={setAddress}/>
				</Stack>
				<Stack direction="column" alignItems="flex-end" sx={{ margin: 3 }}>
					<Legend />
				</Stack>
			</Stack>
			<Box sx={{ position: "absolute", top: 0, right: 0, width: 1, height: 1, zIndex: 1, pointerEvents: "auto" }}>
				<MapContainer address={address} launches={coordinates}/>
			</Box>
		</Box>
	)
}
