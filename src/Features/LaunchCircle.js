import Feature from 'ol/Feature.js';
import {Circle} from 'ol/geom.js'

export default function getLaunchCircle(lat, long, radius) {
    const circleFeature = new Feature({
        geometry: new Circle([lat, long], radius),
    });
    return circleFeature;
}