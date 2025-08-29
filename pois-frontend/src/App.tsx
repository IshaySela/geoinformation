import { useEffect, useState } from 'react'
import './App.css'
import { PoisMap } from './components/PoisMap'
import type { POI } from './Models/POI'
import { getAllPois } from './services/PoisService'
import 'leaflet/dist/leaflet.css';

function App() {
  const [pois, setPois] = useState<POI[]>([])

  useEffect(() => {
    getAllPois().then(ps => setPois(ps));
  }, [])

  return  <PoisMap pois={pois}/>
}

export default App
