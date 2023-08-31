'use client';
import { Box, List, ListItem, ListItemButton, ListItemText, Paper, Stack, TextField, Typography } from '@mui/material'

import StarIcon from '@mui/icons-material/Star'
import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Coordinate } from 'ol/coordinate';
import OSM from 'ol/source/OSM';
import TileLayer from 'ol/layer/Tile';
import {Feature, Map, View} from 'ol';
import { Circle } from 'ol/geom';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';

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
  const [coordinates, setCoordinates] = useState<Coordinate[]>();

  const [address, setAddress] = useState("");
  type addressSuggesstion = {
    "properties": {
      "formatted": ""
    }
  }

  const [addressSuggestions, setAddressSuggesstions] = useState<addressSuggesstion[]>([]);



  useEffect(() => {
    if (address != "") {
      axios(getAddressConfig(address))
        .then(function (response) {
          console.log(response.data);
          setAddressSuggesstions(response.data.features)
        }).catch((err) => {
          console.log("oops")
          console.log(err)
        })
    }

  }, [address])

  function getAddressConfig(text: string) {
    return {
      method: 'get',
      url: `https://api.geoapify.com/v1/geocode/autocomplete?text=${text}&apiKey=6996746ace5b4605a490e1625c60f468`,
      headers: {}
    };
  }

  function doesNotContainAddress(text: string) {
    for (const element of addressSuggestions) {
      if (element.properties.formatted == text) {
        return false;
      }
    }
    return true;
  }

  useEffect(() => {
    const circleFeature = new Feature({
      geometry: new Circle([29, -85], 50),
    });
  
    new Map({
      controls: [],
      layers: [
        new TileLayer({
          source: new OSM(),
          visible: true,
        }),
        new VectorLayer({
          source: new VectorSource({
            features: [circleFeature],
          }),
        }),
      ],
      target: 'map-container',
      view: new View({
        center: [29, -85],
        zoom: 19,
      }),
    });
  }, [])
  


  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    const getRockets = async () => {
      axios.get('https://fdo.rocketlaunch.live/json/launches/next/5')
      .then(async function (response) {
        // handle success
        var rockets = []
        var coordinates: Coordinate[] = [];
        for (let index = 0; index < response.data.count; index++) {
          var location = (response.data.result[index].pad.name).replace(/ /g, "+")
          console.log(location)
          var link = 'https://geocode.maps.co/search?q={' + location + "}'"
          await new Promise(res => setTimeout(res, 1000)).then(() =>
            axios.get(link)
              .then(function (response) {
                coordinates[index] = [response.data[0].lat, response.data[0].lon]
                //console.log(response.data[0].lat)
              })
          );
          rockets[index] = response.data.result[index]
        }
        //console.log(rockets)
        setLaunches(rockets);
        setCoordinates(coordinates);
        console.log(coordinates)
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
    }

    getRockets();
    

  }, []);



  



  return (
    <Box sx={{ width: "100vw", height: "100vh", pointerEvents: "none" }}>
      <Stack direction="column" justifyContent="space-between" sx={{ width: 1, height: 1, position: "relative", zIndex: 2 }}>
        <Stack direction="row" justifyContent="space-between" sx={{ padding: 3 }}>

          <Paper elevation={10} sx={{ height: "min-content", pointerEvents: "auto" }}>
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

              <Paper elevation={10} sx={{ width: 0.4, height: "min-content", pointerEvents: "auto" }}>
                <Paper elevation={2} sx={{ width: 1}}>
                  <TextField fullWidth sx={{display: "inline-block"}} placeholder='Enter your Location' value={address} onChange={(event) => setAddress(event.target.value)}></TextField>
                </Paper>
                {doesNotContainAddress(address) && addressSuggestions.length > 0 && <List>
                  {addressSuggestions.map((value) => (
                    <ListItem key={value.properties.formatted}>

                      <ListItemButton onClick={() => setAddress(value.properties.formatted)}>
                        <ListItemText primary={`${value.properties.formatted}`} />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>}
              </Paper>

        </Stack>

        <Stack direction="column" alignItems="flex-end" sx={{ margin: 3 }}>
          <Paper elevation={10} sx={{ width: "max-content", padding: 1 }}>
            <Stack direction="row" spacing={1}>
              <StarIcon></StarIcon>
              <Typography>Launch Locations</Typography>
            </Stack>
          </Paper>
        </Stack>
      </Stack>


      
        <Box sx={{ position: "absolute", top: 0, right: 0, width: 1, height: 1, zIndex: 1, pointerEvents: "auto" }}>
          <Box id="map-container" sx={{width: 1, height: 1}}></Box>
        </Box>
    </Box>
  )
}
