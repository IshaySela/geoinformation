import { useEffect, useState } from 'react'
import { PoisMap } from './components/PoisMap'
import type { POI } from './Models/POI'
import { createNewPoi, getAllPois, deletePoi, updatePoi } from './services/PoisService'
import 'leaflet/dist/leaflet.css';

function App() {
  const [pois, setPois] = useState<POI[]>([])

  const onCreateNewPoi = (p: POI) => {
    createNewPoi(p).then(resp => {
      if (resp?.id) {
        p.id = resp.id
        setPois([...pois, p])
      }

    }).catch(_ => {
      // display error notification
    })
  }

  const onPoiDelete = (id: string) => {
    deletePoi(id).then(_ => {
      const index = pois.findIndex(p => p.id == id)

      if (index != -1) {
        const copy = [...pois]
        copy.splice(index, 1)
        setPois(copy)
      }
    })
  }

  const onMarkerUpdate = (updated: POI) => {
    updatePoi(updated).then(_ => {
      const copy = [...pois]
      const index = copy.findIndex(p => p.id === updated.id)

      if (index !== -1) {
        copy[index] = updated
        setPois(copy)
      }
    })
  }

  useEffect(() => {
    getAllPois().then(ps => setPois(ps));
  }, [])

  return <>
    <div style={{ height: '100vh' }}>
      <PoisMap
        pois={pois}
        onNewMarker={onCreateNewPoi}
        onMarkerDelete={onPoiDelete}
        onMarkerUpdate={onMarkerUpdate}
      />
    </div></>
}

export default App
