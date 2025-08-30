import { useEffect, useState } from 'react'
import { PoisMap } from './components/PoisMap'
import type { POI } from './Models/POI'
import { createNewPoi, getAllPois } from './services/PoisService'
import 'leaflet/dist/leaflet.css';

function App() {
  const [pois, setPois] = useState<POI[]>([])

  const onCreateNewPoi = (p: POI) => {
    createNewPoi(p).then(_ => {
      // display notification for sucess
    }).catch(_ => {
      // display error notification
    })
  }

  useEffect(() => {
    getAllPois().then(ps => setPois(ps));
  }, [])

  return <>
    <div style={{ height: '100vh' }}>
      <PoisMap pois={pois} createNewPoi={onCreateNewPoi} />
    </div></>
}

export default App
