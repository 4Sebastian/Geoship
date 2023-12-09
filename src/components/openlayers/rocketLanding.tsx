import { Feature } from "ol";
import { Coordinate } from "ol/coordinate";
import { Circle } from "ol/geom";
import { fromLonLat } from "ol/proj";
import { Style } from "ol/style";


export default function getRocketLaunch(coordinate: Coordinate){
    const circleFeature = new Feature({
        geometry: new Circle(fromLonLat(coordinate), 50000)
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

    return circleFeature
}