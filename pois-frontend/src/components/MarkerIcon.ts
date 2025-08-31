import L, { type PointTuple } from 'leaflet'
import markerIcon from '../assets/marker-icon.png'
import markerIcon2x from '../assets/marker-icon-2x.png'
import markerShadow from '../assets/marker-shadow.png'

import redMarkerIcon from '../assets/marker-icon-red.png'
import redMarkerIcon2x from '../assets/marker-icon-2x-red.png'

const defaultSize = {
    iconSize: [25, 41] as PointTuple,
    iconAnchor: [28, 16] as PointTuple,
}
export const MarkerIcon = L.icon({
    ...defaultSize,
    iconUrl: markerIcon,
    iconRetinaUrl: markerIcon2x,
    shadowUrl: markerShadow
})

export const RedMarkerIcon = L.icon({
    ...defaultSize,
    shadowUrl: markerShadow,
    iconUrl: redMarkerIcon,
    iconRetinaUrl: redMarkerIcon2x
})