'use client';
import { Box, List, ListItem, ListItemText, Paper, Stack, TextField, Typography } from '@mui/material'
import StarIcon from '@mui/icons-material/Star';
import axios from 'axios';

import { useEffect, useState } from 'react';


export default function Home() {

  const [launches, setLaunches] = useState([{ "id": -1,
                                            "vehicle": {
                                             "id": -1,
                                             "name": "Loading...",}
                                            }]);

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    // Update the document title using the browser API
    document.title = `GeoShip`;
    axios.get('https://fdo.rocketlaunch.live/json/launches/next/5')
      .then(function (response) {
        // handle success
        var rockets = []
        for (let index = 0; index < response.data.count; index++) {
          //console.log(response.data.result[index].vehicle.name);
          rockets[index] = response.data.result[index]
        }
        console.log(rockets)
        setLaunches(rockets);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
      });

  }, []);

  return (
    <Box sx={{ width: "100vw", height: "100vh" }}>
      <Stack direction="row" justifyContent="space-between" sx={{ padding: 3 }}>

        <Paper elevation={10}>
          <Stack direction="column">
            <Paper elevation={2} sx={{ padding: 1 }}>
              <Typography>Upcoming Launches</Typography>
            </Paper>
            <List>
              {launches.map((value) => (
                <ListItem key={value.id}>
                  <ListItemText primary={`Rocket: ${value.vehicle.name}`} />
                </ListItem>
              ))}
            </List>
          </Stack>
        </Paper>

        <Stack direction="row" spacing={1}>
          <StarIcon></StarIcon>
          <Typography>Launch Locations</Typography>
        </Stack>
        
        <form>
          <TextField placeholder='Enter your Location'></TextField>
        </form>

      </Stack>
    </Box>
  )
}
