"use server";
import { Box, Stack } from '@mui/material'

import Address from '@/components/address';
import LaunchListWithHover from '@/components/launchList/launchListWithHover';
import RocketInfo from '@/components/rocketInfo';
import Distance from '@/components/distanceToRocket';
import { Coordinate } from 'ol/coordinate';

import {getValidRocketIndex} from "@/util/launch/launchUtils";
import {AddressSuggestion, getValidAddress} from "@/util/addressUtils";
import LaunchList from "@/components/launchList/launchList";
import Map from "@/components/map/map";
import {Suspense} from "react";
import {URLSearchParamsType} from "@/util/routingUtils";


export default async function Home({
								 searchParams,
							 }: {
	searchParams: URLSearchParamsType
}) {
	const address: AddressSuggestion | undefined = await getValidAddress(searchParams["address"]);
	const selectedRocketIndex = await getValidRocketIndex(searchParams["selectedRocketIndex"]);

	return (
		<Box sx={{ width: 1, height: 1, pointerEvents: "none" }}>
			<Stack direction="column" justifyContent="space-between" sx={{ width: 1, height: 1, position: "relative", zIndex: 2 }}>
				<Stack direction="row" justifyContent="space-between" sx={{ padding: 3 }}>
					<LaunchList params={searchParams}/>
					<Address params={searchParams} inputtedAddress={address?.formattedAddress}/>
				</Stack>
				<Stack direction="row" justifyContent="space-between" alignItems="flex-end" sx={{ width: 1, padding: 3 }}>
					<Distance selectedRocketIndex={selectedRocketIndex} address={address}/>
					<RocketInfo selectedRocketIndex={selectedRocketIndex} address = {address}/>
				</Stack>
			</Stack>
			<Map address={address} selectedRocketIndex = {selectedRocketIndex} />
		</Box>
	)
}
