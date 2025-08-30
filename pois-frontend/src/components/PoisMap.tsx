import React, { useImperativeHandle, useRef, useState } from "react";
import type { POI } from "../Models/POI";
import { MapContainer, Marker, Popup, TileLayer, useMapEvent } from 'react-leaflet';
import PoiMarker, { type PopiMarkerProps } from "./PoiPopup";
import CreateNewPoiForm from "./CreateNewPoiForm";
import L from 'leaflet'

export type PoisMapProps = {
    pois: POI[],
    onNewMarker: (p: POI) => void
    onMarkerDelete: PopiMarkerProps['onDelete']
    onMarkerUpdate: PopiMarkerProps['onUpdate']
}

export type PoisMapHandle = {
    focus(lat: number, lng: number): void
}

export const PoisMap = React.forwardRef<PoisMapHandle, PoisMapProps>(({ pois, onNewMarker, onMarkerDelete, onMarkerUpdate }: PoisMapProps, ref) => {
    const mapRef = useRef<L.Map>(null)

    useImperativeHandle(ref, () => {
        return {
            focus(lat, lng) {
                mapRef.current?.flyTo([lat, lng], mapRef.current.getZoom())
            }
        }
    })


    return <>
        <MapContainer
            center={[32.0853, 34.7818]} // Tel Aviv
            zoom={13}
            style={{ height: "100%", width: "100%" }}
            ref={mapRef}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
            />
            {
                pois.map(point =>
                    <PoiMarker
                        point={point}
                        key={point.id}
                        onDelete={onMarkerDelete}
                        onUpdate={onMarkerUpdate}
                    />
                )
            }

            <CreateNewPoiPopup onSubmit={onNewMarker} />
        </MapContainer>
    </>
})


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

    return (
        <Marker ref={markerRef} position={[state.lat, state.lng]} opacity={state.show ? 100 : 0}>
            <Popup maxWidth={200}>
                <CreateNewPoiForm latitude={state.lat} longitude={state.lng} onSubmit={onSubmit} />
            </Popup>
        </Marker>
    )

}
