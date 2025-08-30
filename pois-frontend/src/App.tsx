import { useEffect, useState } from 'react'
import { PoisMap } from './components/PoisMap'
import type { POI } from './Models/POI'
import { getAllPois } from './services/PoisService'
import 'leaflet/dist/leaflet.css';

function App() {
  const [pois, setPois] = useState<POI[]>([])

  useEffect(() => {
    getAllPois().then(ps => setPois(ps));
  }, [])

  return <>
    <div style={{ height: '100vh' }}>
      <PoisMap pois={pois} />
    </div></>
}

export default App
