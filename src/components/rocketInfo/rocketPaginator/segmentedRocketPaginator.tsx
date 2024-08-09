import { LaunchesObj } from "@/util/launch/launchDefinitions";
import { IconButton, Link, Stack } from "@mui/material";
import RocketInfo from "../rocketInfo";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';


export default async function SegmentedRocketPaginator({ page, launchesAndCoordinates }: { page: number, launchesAndCoordinates: LaunchesObj }) {
    const rocketsPerPage = 3;
    const rocketsLength = launchesAndCoordinates.getLength();
    const PREVIOUS = -1;
    const NEXT = 1;


    const getPaginatorButton = (icon: any, direction: number) => {
        return (
            <Link style={{ height: 1, padding: 1 }} href={`/?page=${page + direction}`}>
                <IconButton sx={{ height: 1 }}
                    style={{ borderRadius: 5, color: 'white' }} size="large">
                    {icon}
                </IconButton>
            </Link>
        )
    }


    return (
        <>
            {getPaginatorButton(<ArrowBackIosNewIcon />, PREVIOUS)}
            <Stack direction={'row'} sx={{ height: 1, width: 1 }} justifyContent={"center"} alignItems={"right"} spacing={5}>
                {new Array<number>(rocketsPerPage).fill(0).map((_: number, index: number) => {
                    const selectedRocketIndex = page - 1 + index;
                    console.log(selectedRocketIndex)
                    return (
                        selectedRocketIndex < rocketsLength ?
                            <RocketInfo key={index} selectedRocketIndex={selectedRocketIndex} />
                            :
                            <></>
                    )
                })}
            </Stack>
            {getPaginatorButton(<ArrowForwardIosIcon />, NEXT)}
        </>
    )
}
