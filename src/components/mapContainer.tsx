'use client';
import { Box } from '@mui/material'

import React, { useState, useEffect } from "react";
import { Feature } from 'ol';
import { Circle, Geometry } from 'ol/geom';
import { fromLonLat } from 'ol/proj';
import Map from 'ol/Map.js';
import View from 'ol/View.js';
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style.js';
import { Draw, Modify, Snap } from 'ol/interaction.js';
import { GeometryCollection, Point, Polygon } from 'ol/geom.js';
import { OSM, Vector as VectorSource } from 'ol/source.js';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer.js';
import { circular } from 'ol/geom/Polygon.js';
import { getDistance } from 'ol/sphere.js';
import { transform } from 'ol/proj.js';
import RenderFeature from 'ol/render/Feature';
import { StyleFunction } from 'ol/style/Style';
import { Coordinate } from 'ol/coordinate';


export default function MapContainer(props: { address: any }) {
    const raster = new TileLayer({
        source: new OSM(),
    });
    const [source] = useState(new VectorSource());
    
    const [view] = useState(new View({
        center: [-11000000, 6600000],
        zoom: 20,
    }));
    const [addressFeature, setAddressFeature] = useState<Feature>(new Feature());
    const vector = new VectorLayer({
        source: source,
        style: {
            'fill-color': 'rgba(255, 255, 255, 0.2)',
            'stroke-color': '#ffcc33',
            'stroke-width': 3,
            'circle-radius': 15,
            'circle-fill-color': '#ffcc33',
        }
    });

    useEffect(() => {
        new Map({
            controls: [],
            layers: [raster, vector],
            target: 'map',
            view: view,
        });
    }, [])

    useEffect(() => {
        if(props.address){
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


    return (
        <Box sx={{ width: 1, height: 1 }}>
            <Box id="map" sx={{ width: 1, height: 1 }}></Box>
        </Box>
    )
}