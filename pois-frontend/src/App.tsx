import { useEffect, useRef, useState } from 'react'
import { PoisMap, type PoisMapHandle } from './components/PoisMap'
import type { POI } from './Models/POI'
import { createNewPoi, getAllPois, deletePoi, updatePoi } from './services/PoisService'
import 'leaflet/dist/leaflet.css';
import 'react-data-grid/lib/styles.css';
import { PoisTabularView } from './components/PoisTabularView';

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

  const mapRef = useRef<PoisMapHandle>(null)

  return <>
    <div className='h-screen z-0'>
      <PoisMap
        ref={mapRef}
        pois={pois}
        onNewMarker={onCreateNewPoi}
        onMarkerDelete={onPoiDelete}
        onMarkerUpdate={onMarkerUpdate}
      />
    </div>

    <div className='fixed h-1/4 bottom-0 left-0 z-[400] w-full'>
      <PoisTabularView
        focusDblClicked={(lat, lng) => mapRef.current?.focus(lat, lng)}
        pois={pois} />
    </div>
  </>
}

export default App
