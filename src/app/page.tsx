'use client';
import { Box, List, ListItem, ListItemText, Paper, Stack, TextField, Typography } from '@mui/material'

import StarIcon from '@mui/icons-material/Star'
import React, { useState, useEffect } from "react";
import Map from "../Map";
import { Layers, TileLayer, VectorLayer } from "../Layers";
import { osm, vector } from "../Source";
import { fromLonLat } from "ol/proj";
import { Controls, FullScreenControl } from "../Controls";
import mapConfig from "./config.json";
import axios from 'axios';
import { coordinateRelationship } from 'ol/extent';
import { Coordinate } from 'ol/coordinate';
import { Circle } from 'ol/geom';
import FeatureStyles from "../Features/Styles";
import { Feature, View } from 'ol';
import { features } from 'process';
import Style from 'ol/style/Style';
import { OSM } from 'ol/source';
import GeoJSON from "ol/format/GeoJSON";
import VectorSource from 'ol/source/Vector';
import { Fill, Stroke } from 'ol/style';

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
  const [zoom, setZoom] = useState(19);
  const [domLoaded, setDomLoaded] = useState(false);
  const [coordinates, setCoordinates] = useState<Coordinate[]>();

  const circleBoy = new Feature({geometry: new Circle([-80.57724879421858, 28.5620476], 50) })

  const style = new Style({
    renderer: (coordinates: Coordinate[], state) => {
      const [[x, y], [x1, y1]] = coordinates;
      const ctx = state.context;
      const dx = x1 - x;
      const dy = y1 - y;
      const radius = Math.sqrt(dx * dx + dy * dy);

      const innerRadius = 0;
      const outerRadius = radius * 1.4;

      const gradient = ctx.createRadialGradient(
        x,
        y,
        innerRadius,
        x,
        y,
        outerRadius
      );
      gradient.addColorStop(0, 'rgba(255,0,0,0)');
      gradient.addColorStop(0.6, 'rgba(255,0,0,0.2)');
      gradient.addColorStop(1, 'rgba(255,0,0,0.8)');
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, 2 * Math.PI, true);
      ctx.fillStyle = gradient;
      ctx.fill();

      ctx.arc(x, y, radius, 0, 2 * Math.PI, true);
      ctx.strokeStyle = 'rgba(255,0,0,1)';
      ctx.stroke();
    },
  })

  circleBoy.setStyle(
    style
  );
  const geojsonObject2 = mapConfig.geojsonObject2;

  useEffect(() => {
    setDomLoaded(true);
  }, []);


  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    // Update the document title using the browser API
    document.title = `GeoShip`;
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
              <VectorLayer style={style} source={vector({
                features: [circleBoy]
                
              })}></VectorLayer>
               <VectorLayer
              source={vector({
                features: new GeoJSON().readFeatures(geojsonObject2, {
                  featureProjection: "EPSG:3857",
                }),
              })}
              style={FeatureStyles.MultiPolygon}
            />
            </Layers>
            <Controls>
              <FullScreenControl />
            </Controls>
          </Map>
        </Box>}
    </Box>
  )
}
