import { Marker, Popup } from "react-leaflet"
import type { POI } from "../Models/POI"


export type PoiPopupProps = {
    point: POI,
    onDelete?: (id: string) => void
}

export default function PoiPopup({ point, onDelete }: PoiPopupProps) {
    return <Marker key={point.id} position={[point.latitude, point.longitude]}>
        <Popup>
            <h1>{point.name}</h1>
            <p>{point.description}</p>
            <button onClick={onDelete ? _ => onDelete(point.id) : _ => { }} className="text-red-700">Delete Me!</button>
        </Popup>
    </Marker>
}