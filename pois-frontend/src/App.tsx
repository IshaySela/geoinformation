import { useEffect, useState } from 'react'
import { PoisMap } from './components/PoisMap'
import type { POI } from './Models/POI'
import { createNewPoi, getAllPois, deletePoi } from './services/PoisService'
import 'leaflet/dist/leaflet.css';

function App() {
  const [pois, setPois] = useState<POI[]>([])

  const onCreateNewPoi = (p: POI) => {
    createNewPoi(p).then(_ => {
      setPois(pois)
    }).catch(_ => {
      // display error notification
    })
  }

  const onPoiDelete = (id: string) => {
    deletePoi(id).then(_ => {
      setPois(pois)
    })
  }

  useEffect(() => {
    getAllPois().then(ps => setPois(ps));
  }, [pois])

  return <>
    <div style={{ height: '100vh' }}>
      <PoisMap
        pois={pois}
        createNewPoi={onCreateNewPoi}
        onDelete={onPoiDelete}
      />
    </div></>
}

export default App
