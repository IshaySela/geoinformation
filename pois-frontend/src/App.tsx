import { useEffect, useRef, useState } from 'react'
import { PoisMap, type PoisMapHandle } from './components/PoisMap'
import type { POI } from './Models/POI'
import PoiService from './services/PoisService'
import 'leaflet/dist/leaflet.css';
import 'react-data-grid/lib/styles.css';
import { PoisTabularView } from './components/PoisTabularView';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function App() {
  const [pois, setPois] = useState<POI[]>([])

  const onCreateNewPoi = (p: POI) => {
    PoiService.createNewPoi(p).then(resp => {
      if (!resp.success) {
        return toast.error(`Error occured while creating POI: ${resp.problem.title}`)
      }

      p.id = resp.resp.id
      setPois([...pois, p])
      return toast.success(`Created new POI ${p.name}`)
    })
  }

  const onPoiDelete = (id: string) => {
    PoiService.deletePoi(id).then(_ => {
      const index = pois.findIndex(p => p.id == id)

      if (index != -1) {
        const copy = [...pois]
        copy.splice(index, 1)
        setPois(copy)
      }

      toast.success('POI deleted successfully')
    }).catch(err => {
      console.error(`Error while deleting POI ${id}`, err)
      toast.error('Error occured while trying to delete POI...')
    })
  }

  const onMarkerUpdate = (updated: POI) => {
    PoiService.updatePoi(updated).then(resp => {
      if (!resp.success) {
        return toast.error(`Error occured while trying to update the POI ${resp.problem.title}`)
      }

      const copy = [...pois]
      const index = copy.findIndex(p => p.id === updated.id)

      if (index === -1) {
        console.error(`Error while updating poi, poi with id ${updated.id} doesnt exists`)
        return toast.error(`Error occured while trying to update POI ${updated.name}`)
      }

      copy[index] = updated
      setPois(copy)
      toast.success('Updated POI')
    })
  }

  useEffect(() => {
    PoiService.getAllPois()
      .then(resp => {
        if (!resp.success) {
          return toast.error(`Errur occured while loading POIs from server ${resp.problem.title}`);
        }

        setPois(resp.resp.pois)
        toast.success('Loaded all POIs from server')
      }).catch(err => {
        console.log('Error while loading POIs from server', err)
        toast.error("Error occured while loading POIs from server")
      });

  }, [])

  const TEL_AVIV_LATLNG: [number, number] = [32.0853, 34.7818]
  const mapRef = useRef<PoisMapHandle>(null)
  const [open, setOpen] = useState(false)

  return <>
    <div className='h-screen z-0'>
      <PoisMap
        onGeoLocationFound={() => {
          toast.success('Located geolocation')
        }}
        initialLocation={{ geolocation: true, defaultLatLong: TEL_AVIV_LATLNG }}
        ref={mapRef}
        pois={pois}
        onNewMarker={onCreateNewPoi}
        onMarkerDelete={onPoiDelete}
        onMarkerUpdate={onMarkerUpdate}
      />
    </div>

    <div className="fixed bottom-0 left-0 w-full z-[9999] shadow-lg flex flex-col max-h-1/4">
      <button className='bg-slate-700 text-white w-fit mx-auto px-4 rounded-t-lg border' onClick={_ => setOpen(!open)}>
        {open ? '⇊' : '⇈'}
      </button>
      {
        open ?
          <PoisTabularView
            onUpdateClicked={onMarkerUpdate}
            onDeleteClicked={onPoiDelete}
            focusClicked={(lat, lng) => mapRef.current?.focus(lat, lng)}
            pois={pois} />
          : <></>
      }
    </div>

    <ToastContainer />
  </>

}

export default App
