import { Marker, Popup } from "react-leaflet"
import type { POI } from "../Models/POI"


export default function PoiPopup({ point }: { point: POI }) {
    return <Marker key={point.id} position={[point.latitude, point.longitude]}>
        <Popup>
            <h1>{point.name}</h1>
            <p>{point.description}</p>
        </Popup>
    </Marker>
}