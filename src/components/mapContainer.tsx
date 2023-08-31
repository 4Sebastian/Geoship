'use client';
import { Box } from '@mui/material'

import React, { useState, useEffect } from "react";
import OSM from 'ol/source/OSM';
import TileLayer from 'ol/layer/Tile';
import { Feature, Map, View } from 'ol';
import { Circle } from 'ol/geom';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';


export default function MapContainer() {
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

    return (
        <Box id="map-container" sx={{ width: 1, height: 1 }}></Box>
    )
}