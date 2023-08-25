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

var launches = ["Saturn 07", "Forger 11", "Spix 73"];

export default function Home() {

  const [center, setCenter] = useState(mapConfig.center);
  const [zoom, setZoom] = useState(9);
  const [domLoaded, setDomLoaded] = useState(false);

  useEffect(() => {
    setDomLoaded(true);
  }, []);

  if (!domLoaded){
    return <div></div>
  }

  return (
    <Box sx={{ width: "100vw", height: "100vh", pointerEvents: "none"}}>
      <Stack direction="row" justifyContent="space-between" sx={{ padding: 3, pointerEvents: "auto", position: "relative", zIndex: "2"}}>

        <Paper elevation={10}>
          <Stack direction="column">
            <Paper elevation={2} sx={{ padding: 1 }}>
              <Typography>Upcoming Launches</Typography>
            </Paper>
            <List>
              {launches.map((value) => (
                <ListItem key={value}>
                  <ListItemText primary={`Rocket: ${value}`} />
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
      <Box sx={{position: "absolute", top: 0, right: 0, width: 1, height: 1, zIndex: 1, pointerEvents: "auto"}}>
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
