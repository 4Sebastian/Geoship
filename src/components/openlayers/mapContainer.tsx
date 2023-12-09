'use client';
import { Box } from '@mui/material'

import React, { useState, useEffect } from "react";
import { Feature } from 'ol';
import { fromLonLat } from 'ol/proj';
import Map from 'ol/Map.js';
import View from 'ol/View.js';
import { Geometry, Point } from 'ol/geom.js';
import { OSM, Vector as VectorSource } from 'ol/source.js';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer.js';
import getRocketLaunch from './rocketLanding';


export default function MapContainer(props: { address: any, launches: any, selectedRocketIndex: any }) {
    const [source] = useState(new VectorSource());
    const [vector] = useState<VectorLayer<VectorSource<Geometry>>>(new VectorLayer({ source: source }));
    const [view] = useState<View>(new View({ center: [-11000000, 6600000], zoom: 20 }));
    const [addressFeature, setAddressFeature] = useState<Feature>(new Feature());

    useEffect(() => {
        new Map({
            controls: [],
            layers: [
                new TileLayer({
                    source: new OSM(),
                }), 
                vector
            ],
            target: 'map',
            view: view,
        });
    }, [])

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
        if (props.launches) {
            for (let index = 0; index < props.launches.length; index++) {
                if (props.launches[index] && props.launches[index].length >= 2) {
                    source.addFeature(getRocketLaunch([props.launches[index][1], props.launches[index][0]]));
                }
            }
        }
    }, [props.launches])

    useEffect(() => {
        if (props.selectedRocketIndex != null) {
            view.setCenter(fromLonLat([props.launches[props.selectedRocketIndex][1], props.launches[props.selectedRocketIndex][0]]))
            view.setZoom(10)
        }
    }, [props.selectedRocketIndex])

    return (
        <Box sx={{ width: 1, height: 1 }}>
            <Box id="map" sx={{ width: 1, height: 1 }}></Box>
        </Box>
    )
}