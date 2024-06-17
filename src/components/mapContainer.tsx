'use client';
import { Box } from '@mui/material'

import React, { useState, useEffect } from "react";
import { Feature } from 'ol';
import { Circle } from 'ol/geom';
import { fromLonLat } from 'ol/proj';
import Map from 'ol/Map.js';
import View from 'ol/View.js';
import { Style } from 'ol/style.js';
import { Point } from 'ol/geom.js';
import { OSM, Vector as VectorSource } from 'ol/source.js';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer.js';
import { Coordinate } from 'ol/coordinate';
import {getAllLaunchesAndCoordinates} from "@/util/launchUtils";


export default function MapContainer(props: { address: any, selectedRocketIndex: any }) {
  const raster = new TileLayer({
    source: new OSM(),
  });
  const [source] = useState(new VectorSource());
  const [map, setMap] = useState<Map | undefined>(undefined);
  const [coords, setCoords] = useState<any[]>([]);

  const [view] = useState(new View({
    center: [-11000000, 6600000],
    zoom: 20,
  }));
  const [addressFeature, setAddressFeature] = useState<Feature>(new Feature());

  const vector = new VectorLayer({
    source: source,
  });

  //Note, this Map must be created on the client side because it is dependent on document, which is client-side only
  new Map({
    controls: [],
    layers: [raster, vector],
    target: 'map',
    view: view,
  });

  useEffect(() => {
    getAllLaunchesAndCoordinates().then(res => {
      setCoords(res.coords);
      // fetchAllImages(res.rockets);
      console.log("Got launches and coordinates")
    }).catch(error => console.log(error));
  }, []);

  useEffect(() => {
    if (props.address) {
      source.removeFeature(addressFeature)
      var feat = new Feature({
        geometry: new Point(fromLonLat(props.address.geometry.coordinates)),
      })
      view.setCenter(fromLonLat(props.address.geometry.coordinates))
      view.setZoom(20)
      setAddressFeature(feat)
      source.addFeature(feat);
    }
  }, [props.address])

  useEffect(() => {
    if (coords) {
      //console.log(props.coordinates);
      for (let index = 0; index < coords.length; index++) {
        if (coords[index] && coords[index].length >= 2) {
          //console.log(index);
          //console.log(fromLonLat([props.coordinates[index][1], props.coordinates[index][0]]))

          const circleFeature = new Feature({
            geometry: new Circle(fromLonLat([coords[index][1], coords[index][0]]), 50000)
          });
          circleFeature.setStyle(
            new Style({
              renderer(coordinates, state) {
                const [[x, y], [x1, y1]] = coordinates as Coordinate[];
                const ctx = state.context;
                const dx = x1 - x;
                const dy = y1 - y;
                const radius = Math.sqrt(dx * dx + dy * dy);
                //console.log(radius)

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
                gradient.addColorStop(0, 'rgba(0,255,0,0.2)');
                gradient.addColorStop(0.4, 'rgba(255,165,0,0.2)');
                gradient.addColorStop(0.7, 'rgba(255,0,0,0.2)');
                gradient.addColorStop(1, 'rgba(255,0,0,0)');
                ctx.beginPath();

                ctx.arc(x, y, radius, 0, 2 * Math.PI, true);
                ctx.fillStyle = gradient;
                ctx.fill();
              },
            })
          );


          source.addFeature(circleFeature);
        }
      }
    }
  }, [coords])

  useEffect(() => {
    //console.log(props.selectedRocketIndex)
    if (props.selectedRocketIndex != null) {
      //console.log(props.coordinates[props.selectedRocketIndex])
      view.setCenter(fromLonLat([coords[props.selectedRocketIndex][1], coords[props.selectedRocketIndex][0]]))
      view.setZoom(10)
    }
  }, [props.selectedRocketIndex])

  return (
    <Box sx={{ width: 1, height: 1 }}>
      <Box id="map" sx={{ width: 1, height: 1 }}></Box>
    </Box>
  )
}
