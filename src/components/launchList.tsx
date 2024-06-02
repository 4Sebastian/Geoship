import { Box, Grid, List, ListItem, ListItemText, Paper, Stack, Tooltip, Typography } from '@mui/material'

import React, { useState, useEffect } from "react";

export default function LaunchList(props: { setCoordinates: Function, setSelectedRocket: Function, setSelectedRocketIndex: Function, setLaunches: Function, launches: any }) {
    const [hoveredItem, setHoveredItem] = useState<any>(null);
    const [estimatedDate, setEstimatedDate] = useState<any>(undefined);
    const [ticking, setTicking] = useState(false),
        [count, setCount] = useState(0)
    const [estimatedDateString, setEstimatedDateString] = useState<string>("");

    const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
    const [images, setImages] = useState<{ [key: string]: string }>({});

    const GOOGLE_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
    const GOOGLE_CX = process.env.NEXT_PUBLIC_GOOGLE_CX;

    async function handle_rockets(response: Response){
        var rockets: any[] = []
        var coords: number[][] = [];
        var promises: Promise<Response>[] = []
        var body = await response.json();
        for (let index = 0; index < body.count; index++) {
            var padId = body.result[index].pad.id
            var promise = fetch(`https://fdo.rocketlaunch.live/json/pads?id=${padId}&key=${process.env.NEXT_PUBLIC_ROCKET_TOKEN}`)
            promises.push(promise)
        }
        Promise.all(promises).then(async (values) => {
            for (let index = 0; index < values.length; index++) {
                var valueBody = await values[index].json()
                if (!(body.result[index].vehicle.name == "TBD" || valueBody.result[0].location.longitude == "")) {
                    coords.push([parseFloat(valueBody.result[0].location.latitude), parseFloat(valueBody.result[0].location.longitude)])
                    rockets.push(body.result[index])
                }
            }

            props.setLaunches(rockets)
            props.setCoordinates(coords)
            fetchAllImages(rockets)
        });

    }

    useEffect(() => {
        fetch(`https://fdo.rocketlaunch.live/json/launches?key=${process.env.NEXT_PUBLIC_ROCKET_TOKEN}`)
            .then(handle_rockets)
            .catch(function (error) {
                console.log(error)
            })

        const handleMouseMove = (e: { clientX: any; clientY: any; }) => {
            setCursorPosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    function getDate(est_date: any) {
        var date = new Date(est_date.year, est_date.month - 1, est_date.day)

        return date.toDateString()
    }

    function handleHover(value: any) {
        setHoveredItem(value);
        if (value) {
            setEstimatedDate(value.t0);
            setTicking(true);
        } else {
            setEstimatedDate(undefined);
            setTicking(false);
        }
    }

    function handleClick(value: any, index: number) {
        props.setSelectedRocket(value)
        props.setSelectedRocketIndex(index)
    }

    useEffect(() => {
        if (estimatedDate != undefined) {
            getTimeTillLaunch()
        }
    }, [estimatedDate])



    useEffect(() => {
        const timer = setTimeout(() => ticking && setCount(count + 1), 1e3)
        getTimeTillLaunch();
        return () => clearTimeout(timer)
    }, [count, ticking])


    function getTimeTillLaunch() {

        if (estimatedDate != undefined) {
            //"2023-10-26T03:14Z"
            var date = new Date(estimatedDate)
            var today = new Date(Date.now());

            var difference = date.getTime() - today.getTime();
            //var diffDate = new Date(difference)

            var seconds = Math.floor(difference / 1000);
            var minutes = Math.floor(seconds / 60);
            var hours = Math.floor(minutes / 60);
            var days = Math.floor(hours / 24);

            hours %= 24;
            minutes %= 60;
            seconds %= 60;



            if (difference <= 0) {
                setEstimatedDateString(`Right Now!`);
                return 'Right Now!'
            }
            setEstimatedDateString(`${days}d:${hours}h:${minutes}m:${seconds}s`);
            //setEstimatedDateString(`${days}d:${hours}h:${minutes}m:${seconds}s`);
            return `${days}d:${hours}h:${minutes}m:${seconds}s`;
        } else {
            return ''
        }


    }

    async function fetchImage(query: string) {
        try {
            const response = await axios.get(`https://www.googleapis.com/customsearch/v1`, {
                params: {
                    key: GOOGLE_API_KEY,
                    cx: GOOGLE_CX,
                    q: query,
                    searchType: 'image',
                    num: 1
                }
            });

            if (response.data.items && response.data.items.length > 0) {
                return response.data.items[0].link;
            } else {
                return 'https://via.placeholder.com/150';
            }
        } catch (error) {
            console.error('Error fetching image:', error);
            return 'https://via.placeholder.com/150'; 
        }
    }

    async function fetchAllImages(rockets: any[]) {
        const imagePromises = rockets.map((rocket) => fetchImage(rocket.vehicle.name + "-rocket"));
        const images = await Promise.all(imagePromises);
        const imageMap: { [key: string]: string } = {};
        rockets.forEach((rocket, index) => {
            imageMap[rocket.vehicle.name] = images[index];
        });
        setImages(imageMap);
    }

    return ( 
        <Paper elevation={10} sx={{ height: "400px", pointerEvents: "auto", overflowY: "auto" }}>
            <Stack direction="column">
                <Paper elevation={2} sx={{ padding: 1 }}>
                    <Typography>Upcoming Launches</Typography>
                </Paper>




                <List style={{ overflowY: 'auto' }}>
                    {props.launches.length == 0 ?
                        <ListItem key="loading">
                            <ListItemText primary={`Loading...`} />
                        </ListItem>
                        :
                        props.launches.map((value: { id: React.Key | null | undefined; vehicle: { name: any; }; }, index: number) => (
                            <ListItem
                                key={index}
                                onMouseEnter={() => handleHover(value)}
                                onMouseLeave={() => handleHover(null)}
                                onMouseDown={() => handleClick(value, index)}>
                                <ListItemText primary={`Rocket: ${value.vehicle.name}`} />

                            </ListItem>
                        ))}
                </List>
            </Stack>

            {
                hoveredItem && (
                    <Paper elevation={5} sx={{
                        position: 'fixed',
                        top: cursorPosition.y + 10 + 'px',
                        left: cursorPosition.x + 10 + 'px',
                        width: 'max-content',
                        height: 0.175
                    }}>
                        <Stack direction="row" sx={{ height: 1, padding: 1 }} spacing={1}>
                            <Box component="img" sx={{ objectFit: 'cover', aspectRatio: 1 }}
                                src={images[hoveredItem.vehicle.name] || 'https://via.placeholder.com/150'}
                                alt={hoveredItem.vehicle.name}
                                loading="lazy"
                            >

                            </Box>

                            <Stack direction="column" justifyContent="space-between">
                                <Stack direction="row" spacing={1} justifyContent="space-between" alignItems="center" sx={{ width: 1, height: 1 }}>
                                    <Typography variant='h5'>
                                        rocket name:
                                    </Typography>
                                    <Typography variant='h5'>
                                        {hoveredItem.vehicle.name}
                                    </Typography>
                                </Stack>
                                <Stack direction="row" spacing={1} justifyContent="space-between" alignItems="center" sx={{ width: 1, height: 1 }}>
                                    <Typography variant='body1'>
                                        Launch Location:
                                    </Typography>
                                    <Typography variant='body1'>
                                        {hoveredItem.pad.location.name}
                                    </Typography>
                                </Stack>
                                <Stack direction="row" spacing={1} justifyContent="space-between" alignItems="center" sx={{ width: 1, height: 1 }}>
                                    <Typography variant='body1'>
                                        Launch date:
                                    </Typography>
                                    <Typography variant='body1'>
                                        {getDate(hoveredItem.est_date)}
                                    </Typography>
                                </Stack>
                                <Stack direction="row" spacing={1} justifyContent="space-between" alignItems="center" sx={{ width: 1, height: 1 }}>
                                    <Typography variant='body1'>
                                        Time until launch:
                                    </Typography>
                                    <Typography variant='body1'>
                                        {estimatedDateString}
                                    </Typography>
                                </Stack>
                            </Stack>
                        </Stack>
                    </Paper>
                )
            }
        </Paper >
    )
}