"use server";
import { Box, Stack } from '@mui/material'

import Address from '@/components/address';
import LaunchListWithHover from '@/components/launchList/launchListWithHover';
import RocketInfo from '@/components/rocketInfo';
import Distance from '@/components/distanceToRocket';
import { Coordinate } from 'ol/coordinate';

import dynamic from 'next/dynamic'
import {getValidRocketIndex} from "@/util/launchUtils";
import {getValidAddress} from "@/util/addressUtils";
import LaunchList from "@/components/launchList/launchList";

const MapContainer = dynamic(
	() => import('@/components/mapContainer'),
	{ ssr: false }
)


export default async function Home({
								 searchParams,
							 }: {
	searchParams: { [key: string]: string | string[] | undefined }
}) {
	const address = await getValidAddress(searchParams["address"]);
	const selectedRocketIndex = await getValidRocketIndex(searchParams["selectedRocketIndex"]);

	return (
		<Box sx={{ width: "100vw", height: "100vh", pointerEvents: "none" }}>
			<Stack direction="column" justifyContent="space-between" sx={{ width: 1, height: 1, position: "relative", zIndex: 2 }}>
				<Stack direction="row" justifyContent="space-between" sx={{ padding: 3 }}>
					<LaunchList/>
					<Address/>
				</Stack>
				<Stack direction="row" justifyContent="space-between" alignItems="flex-end" sx={{ width: 1, padding: 3 }}>
					<Distance selectedRocketIndex={selectedRocketIndex} address={address}/>
					<RocketInfo selectedRocketIndex={selectedRocketIndex} address = {address}/>
				</Stack>
			</Stack>
			<Box sx={{ position: "absolute", top: 0, right: 0, width: 1, height: 1, zIndex: 1, pointerEvents: "auto" }}>
				<MapContainer address={address} selectedRocketIndex = {selectedRocketIndex} />
			</Box>
		</Box>
	)
}
