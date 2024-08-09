import { LaunchesObj } from "@/util/launch/launchDefinitions";
import { Stack } from "@mui/material";
import RocketInfo from "../rocketInfo";


export default async function ContinuousRocketPaginator({ launchesAndCoordinates }: { launchesAndCoordinates: LaunchesObj }) {

    return (
        <>
            <Stack direction={'row'} sx={{ height: 1, width: '100%', overflowX: "auto", paddingX: 5 }} spacing={5}>
                {new Array<number>(launchesAndCoordinates.getLength()).fill(0).map((_: number, index: number) => {
                    return (
                        <RocketInfo key={index} selectedRocketIndex={index} />
                    )
                })}
            </Stack>
        </>
    )
}
