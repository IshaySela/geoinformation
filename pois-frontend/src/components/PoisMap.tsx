import { type JSX } from "react";
import type { POI } from "../Models/POI";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

export type PoisMapProps = {
    pois: POI[]
}

export function PoisMap({ pois }: PoisMapProps): JSX.Element {

    return <MapContainer
        center={[32.0853, 34.7818]} // Tel Aviv
        zoom={13}
        style={{ height: "500px", width: "100%" }}
    >
        <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
        />
        {
            pois.map(point => {
                return <Marker position={[point.latitude, point.longitude]}>
                    <Popup>{point.name}</Popup>
                </Marker>
            })
        }
    </MapContainer>
}