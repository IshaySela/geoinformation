import { useEffect, useState } from 'react'
import './App.css'
import { PoisMap } from './components/PoisMap'
import type { POI } from './Models/POI'
import { getAllPois } from './services/PoisService'

function App() {
  const [pois, setPois] = useState<POI[]>([])

  useEffect(() => {
    getAllPois().then(ps => setPois(ps));
  }, [])

  return <div className="bg-amber-950">
    <PoisMap pois={pois}/>
  </div>
}

export default App
