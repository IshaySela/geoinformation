import L from 'leaflet'
import markerIcon from '../assets/marker-icon.png'
import markerIcon2x from '../assets/marker-icon-2x.png'
import markerShadow from '../assets/marker-shadow.png'


const MarkerIcon = L.icon({
    iconSize: [25, 41],
    iconAnchor: [28, 16],
    iconUrl: markerIcon,
    iconRetinaUrl: markerIcon2x,
    shadowUrl: markerShadow
})

export default MarkerIcon