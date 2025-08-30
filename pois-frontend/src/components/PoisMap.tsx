import { useEffect, useRef, useState, type JSX } from "react";
import type { POI } from "../Models/POI";
import { MapContainer, Marker, Popup, TileLayer, useMapEvent } from 'react-leaflet';
import PoiPopup from "./PoiPopup";
import { type LeafletMouseEvent, type Map as LeafletMap, Marker as LeafletMarker, marker } from "leaflet";
import CreateNewPoiForm from "./CreateNewPoiForm";
import L from 'leaflet'

export type PoisMapProps = {
    pois: POI[]
}


export function PoisMap({ pois }: PoisMapProps): JSX.Element {
    const mapOnClick = (map: LeafletMap, ev: LeafletMouseEvent) => {
        // const test = <CreateNewPoiForm lat={ev.latlng.lat} lng={ev.latlng.lng} onSubmit={p => { }} />
    }


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
                    <PoiPopup point={point} key={point.id} />
                )
            }

            <CreatePopupOnClick onClick={mapOnClick} />
        </MapContainer>
    </>
}

/**
 * Hooks to the maps 'click' event. This needs to be done in a component that is 
 * a child of <MapContainer>
 * @param onClick The callback to call, accepts LeafletMap object and the event details
 * @returns Stub component with no body
 */
function CreatePopupOnClick({ onClick }: { onClick: (map: LeafletMap, ev: LeafletMouseEvent) => void }) {
    const [state, setState] = useState({
        lat: 0, lng: 0, show: false
    })

    const markerRef = useRef<L.Marker>(null);

    const map = useMapEvent('click', ev => {
        const { lat, lng } = ev.latlng
        setState({ show: true, lat: lat, lng: lng })

        markerRef.current?.openPopup([lat, lng])
        onClick(map, ev)
    })

    return <div>
        <Marker ref={markerRef} position={[state.lat, state.lng]} opacity={state.show ? 100 : 0}>
            <Popup>
                <CreateNewPoiForm lat={state.lat} lng={state.lng} onSubmit={_ => { }} />
            </Popup>
        </Marker>
    </div>
}
