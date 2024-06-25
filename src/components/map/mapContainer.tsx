'use client';
import {Box} from '@mui/material'

import React, {useState, useEffect} from "react";
import {Feature} from 'ol';
import {Circle} from 'ol/geom';
import {fromLonLat} from 'ol/proj';
import Map from 'ol/Map.js';
import View from 'ol/View.js';
import {Style} from 'ol/style.js';
import {Point} from 'ol/geom.js';
import {OSM, Vector as VectorSource} from 'ol/source.js';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer.js';
import {Coordinate} from 'ol/coordinate';


export default function MapContainer({address, selectedRocketIndex, coords}: {
    address: any,
    selectedRocketIndex: any,
    coords: any[]
}) {
    const raster = new TileLayer({
        source: new OSM(),
    });
    const source = new VectorSource();

    const view = new View({
        center: [-11000000, 6600000],
        zoom: 20,
    });

    const vector = new VectorLayer({
        source: source,
    });

    //Note, this Map must be created on the client side because it is dependent on document, which is client-side only
    //and it must be in a use effect with the return statement to avoid duplicate map creation while waiting for the
    //renderer to attach to the map object (this is an open layers library interaction that cannot be controlled outside
    //a use effect.
    useEffect(() => {
        const map = new Map({
            controls: [],
            layers: [raster, vector],
            target: 'map',
            view: view,
        });

        return () => {
            map.setTarget(undefined)
        }
    });

    if (address) {
        var feat = new Feature({
            geometry: new Point(fromLonLat(address.geometry.coordinates)),
        })
        view.setCenter(fromLonLat(address.geometry.coordinates))
        view.setZoom(20)
        source.addFeature(feat);
    }

    if (coords) {
        for (let index = 0; index < coords.length; index++) {
            if (coords[index] && coords[index].length >= 2) {

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

    if (selectedRocketIndex != null && coords && coords.length > selectedRocketIndex) {
        view.setCenter(fromLonLat([coords[selectedRocketIndex][1], coords[selectedRocketIndex][0]]))
        view.setZoom(10)
    }

    return (
        <Box id="map" sx={{width: 1, height: 1}}></Box>
    )
}
