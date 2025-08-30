import { useRef, useState, type JSX } from "react";
import type { POI } from "../Models/POI";
import { MapContainer, Marker, Popup, TileLayer, useMapEvent } from 'react-leaflet';
import PoiPopup, { type PoiPopupProps } from "./PoiPopup";
import CreateNewPoiForm from "./CreateNewPoiForm";
import L from 'leaflet'

export type PoisMapProps = {
    pois: POI[],
    createNewPoi: (p: POI) => void
    onDelete: PoiPopupProps['onDelete']
}


export function PoisMap({ pois, createNewPoi, onDelete }: PoisMapProps): JSX.Element {

    return <>
        <MapContainer
            center={[32.0853, 34.7818]} // Tel Aviv
            zoom={13}
            style={{ height: "100%", width: "100%" }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
            />
            {
                pois.map(point =>
                    <PoiPopup point={point} key={point.id} onDelete={onDelete} />
                )
            }

            <CreateNewPoiPopup onSubmit={createNewPoi} />
        </MapContainer>
    </>
}

/**
 * The component CreateNewPoiPopup creates a Marker with a Popup that is updated
 * to the cursor location every time the user clicks the map.
 * The popup of the marker is the form for creating new POI.
 * When the form is submitted, call the callback
 */
function CreateNewPoiPopup({ onSubmit }: { onSubmit: (poi: POI) => void }) {
    const [state, setState] = useState({
        lat: 0, lng: 0, show: false
    })

    const markerRef = useRef<L.Marker>(null);

    useMapEvent('click', ev => {
        const { lat, lng } = ev.latlng
        setState({ show: true, lat: lat, lng: lng })

        markerRef.current?.openPopup([lat, lng])
    })

    return <>
        <Marker ref={markerRef} position={[state.lat, state.lng]} opacity={state.show ? 100 : 0}>
            <Popup maxWidth={200}>
                <CreateNewPoiForm lat={state.lat} lng={state.lng} onSubmit={onSubmit} />
            </Popup>
        </Marker>
    </>

}
