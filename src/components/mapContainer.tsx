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
import { StyleFunction, StyleLike } from 'ol/style/Style';
import { Coordinate } from 'ol/coordinate';


export default function MapContainer(props: { address: any , coordinates: any, selectedRocketIndex: any}) {
    const raster = new TileLayer({
        source: new OSM(),
    });
    const [source] = useState(new VectorSource());
    
    const [view] = useState(new View({
        center: [-11000000, 6600000],
        zoom: 20,
    }));
    const [addressFeature, setAddressFeature] = useState<Feature>(new Feature());
    const [launchFeature, setLaunchFeature] = useState<Feature>(new Feature());

    const circleStyleFunction = (circleColor: string) => {

        return new Style({
            fill: new Fill({
                color: circleColor,
            }),
            stroke: new Stroke({
                color: '#ffcc33',
                width: 3,
            }),
            image: new CircleStyle({
                radius: 15,
                fill: new Fill({
                    color: '#ffcc33',
                }),
            }),
        });
        // Default style if radius doesn't match any condition
        return new Style({
            // Default style properties
        });
    };


    const circleGradientStyleFunction = (opacity: number) => {
        const canvas = document.createElement('canvas');
        canvas.width = 32;
        canvas.height = 32;
        const context = canvas.getContext('2d');
    
        if (context) {
            const gradient = context.createRadialGradient(16, 16, 0, 16, 16, 16);
            gradient.addColorStop(0, 'yellow');
            gradient.addColorStop(1, 'red');
    
            context.arc(16, 16, 15, 0, 2 * Math.PI);
            context.fillStyle = gradient;
            context.globalAlpha = opacity;
            context.fill();
    
            return new Style({
                image: new CircleStyle({
                    radius: 15,
                    fill: new Fill({
                        color: context.createPattern(canvas, 'no-repeat'),
                    }),
                    stroke: new Stroke({
                        color: '#ffcc33',
                        width: 3,
                    }),
                }),
            });
        } else {
            return new Style(); // Return default empty style if canvas context is not available
        }
    };
    const vector = new VectorLayer({
        source: source,
        
        // {
        //     'fill-color': 'rgba(255, 0, 0, 0.2)',
        //     'stroke-color': '#ffcc33',
        //     'stroke-width': 3,
        //     'circle-radius': 15,
        //     'circle-fill-color': '#ffcc33',
        // }

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

    useEffect(() => {
        if(props.coordinates){
            for (let index = 0; index < props.coordinates.length; index++){
                //if(props.launches[index] && props.launches[index].length >= 2){
                    source.removeFeature(launchFeature)
                    var feat = new Feature({
                        geometry: new Circle(fromLonLat([props.coordinates[index][1], props.coordinates[index][0]]), 50000),
                    })
                    var feat2 = new Feature({
                        geometry: new Circle(fromLonLat([props.coordinates[index][1], props.coordinates[index][0]]), 100000),
                    })
                    var feat3 = new Feature({
                        geometry: new Circle(fromLonLat([props.coordinates[index][1], props.coordinates[index][0]]), 150000),
                    })
                    //view.setCenter(fromLonLat([props.launches[index][1], props.launches[index][0]]))
                    //setLaunchFeature(feat)
                    feat.setStyle(circleStyleFunction('rgba(255, 0, 0, 0.15)'));
                    feat2.setStyle(circleStyleFunction('rgba(255, 165, 0, 0.15)'));
                    feat3.setStyle(circleStyleFunction('rgba(255, 255, 0, 0.15)'));
                    source.addFeature(feat);
                    source.addFeature(feat2);
                    source.addFeature(feat3);
                //}  
            }  
        } 
    }, [props.coordinates])

    useEffect(() => {
        if(props.selectedRocketIndex != null){
            view.setCenter(fromLonLat([props.coordinates[props.selectedRocketIndex][1], props.coordinates[props.selectedRocketIndex][0]]))
            view.setZoom(10)
        } 
    }, [props.selectedRocketIndex])

    return (
        <Box sx={{ width: 1, height: 1 }}>
            <Box id="map" sx={{ width: 1, height: 1 }}></Box>
        </Box>
    )
}