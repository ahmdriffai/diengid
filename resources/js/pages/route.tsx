// RoadRouteMap.tsx
import L from 'leaflet';
import 'leaflet-routing-machine';
import 'leaflet/dist/leaflet.css';
import { MapPin } from 'lucide-react';
import { useEffect } from 'react';
import { renderToString } from 'react-dom/server';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';

interface LocationPoint {
    id: string;
    name: string;
    lat: number;
    lng: number;
    image: string;
    description: string;
}

const locations: LocationPoint[] = [
    {
        id: '1',
        name: 'Titik Awal',
        lat: -7.203181,
        lng: 109.90359,
        image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470',
        description: 'Lokasi keberangkatan karyawan',
    },
    {
        id: '2',
        name: 'Titik Tujuan',
        lat: -7.2697555,
        lng: 109.9198834,
        image: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d',
        description: 'Lokasi kantor cabang',
    },
];

const iconHtml = renderToString(
    <div className="rounded-full bg-emerald-800 p-2.5 text-white shadow-lg">
        <MapPin size={20} />
    </div>,
);

type LatLngTuple = [number, number];

const points: LatLngTuple[] = [
    [-7.203181, 109.90359],
    [-7.2697555, 109.9198834],
];

const customIcon = L.divIcon({
    className: '',
    html: iconHtml,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
});

function Routing() {
    const map = useMap();

    useEffect(() => {
        const routingControl = L.Routing.control({
            waypoints: points.map((p) => L.latLng(p[0], p[1])),
            lineOptions: {
                styles: [{ color: 'green', weight: 5 }],
            },
            show: true, // penting
            addWaypoints: false,
            routeWhileDragging: false,
            draggableWaypoints: false,
            fitSelectedRoutes: true,
            createMarker: () => null, // 🔥 penting
        }).addTo(map);

        return () => {
            map.removeControl(routingControl);
        };
    }, [map]);

    return null;
}

export default function RoadRouteMap() {
    return (
        <div className="p-1 md:p-20">
            <MapContainer center={points[0]} zoom={14} style={{ height: '600px', width: '100%' }}>
                <TileLayer attribution="&copy; OpenStreetMap contributors" url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Routing />
                <CustomMarkers />
            </MapContainer>
        </div>
    );
}

import { Marker, Popup } from 'react-leaflet';

function CustomMarkers() {
    return (
        <>
            {locations.map((loc) => (
                <Marker key={loc.id} position={[loc.lat, loc.lng]} icon={customIcon}>
                    <Popup>
                        <div className="w-64">
                            <img src={loc.image} alt={loc.name} className="mb-3 h-32 w-full rounded-lg object-cover" />
                            <h3 className="text-base font-semibold">{loc.name}</h3>
                            <p className="text-sm text-gray-600">{loc.description}</p>
                        </div>
                    </Popup>
                </Marker>
            ))}
        </>
    );
}
