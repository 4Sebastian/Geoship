'use client';
import { Box, List, ListItem, ListItemText, Paper, Stack, TextField, Typography } from '@mui/material'

import StarIcon from '@mui/icons-material/Star'
import React, { useState, useEffect } from "react";
import Map from "../Map";
import { Layers, TileLayer } from "../Layers";
import { osm } from "../Source";
import { fromLonLat } from "ol/proj";
import { Controls, FullScreenControl } from "../Controls";
import mapConfig from "./config.json";
import axios from 'axios';



export default function Home() {
  const [launches, setLaunches] = useState([
    {
      "id": -1,
      "vehicle": {
        "id": -1,
        "name": "Loading...",
      }
    }
  ]);
  const [center, setCenter] = useState(mapConfig.center);
  const [zoom, setZoom] = useState(9);
  const [domLoaded, setDomLoaded] = useState(false);

  useEffect(() => {
    setDomLoaded(true);
  }, []);

  
  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    // Update the document title using the browser API
    document.title = `GeoShip`;
    axios.get('https://fdo.rocketlaunch.live/json/launches/next/5')
      .then(function (response) {
        // handle success
        var rockets = []
        for (let index = 0; index < response.data.count; index++) {
          rockets[index] = response.data.result[index]
        }
        //console.log(rockets)
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

  if (!domLoaded) {
    return <div></div>
  }


  return (
    <Box sx={{ width: "100vw", height: "100vh", pointerEvents: "none" }}>
      <Stack direction="row" justifyContent="space-between" sx={{ padding: 3, pointerEvents: "auto", position: "relative", zIndex: "2" }}>

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

      {domLoaded &&
        <Box sx={{ position: "absolute", top: 0, right: 0, width: 1, height: 1, zIndex: 1, pointerEvents: "auto" }}>
          <Map center={fromLonLat(center)} zoom={zoom}>
            <Layers>
              <TileLayer source={osm()} zIndex={0} />
            </Layers>
            <Controls>
              <FullScreenControl />
            </Controls>
          </Map>
        </Box>}
    </Box>
  )
}
