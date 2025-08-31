import { Marker, Popup } from "react-leaflet"
import type { POI } from "../Models/POI"
import { useEffect, useRef, useState } from "react"
import L from "leaflet"
import MarkerIcon from "./MarkerIcon"



export type PopiMarkerProps = {
    point: POI,
    onDelete?: (id: string) => void,
    onUpdate: (copy: POI) => void
}

export default function PoiMarker({ point, onDelete, onUpdate }: PopiMarkerProps) {
    const [editable, setEditable] = useState(false)
    const [pointCopy, setPointCopy] = useState(structuredClone(point))

    const onCommitChanges = () => {
        onUpdate(pointCopy)
        setEditable(false)
    }

    useEffect(() => {
        ref.current?.bindTooltip(point.name, { permanent: true, direction: 'bottom', offset: [-15, 20] })
    }, [point])

    // When closing edit mode, returned to old state
    useEffect(() => {
        setPointCopy(point)
    }, [editable])

    const ref = useRef<L.Marker>(null)

    return <Marker
        key={point.id}
        position={[point.latitude, point.longitude]}
        title={point.name}
        ref={ref}
        icon={MarkerIcon}
        riseOnHover>
        <Popup>
            {
                editable ?
                    <>
                        <input onChange={ev => setPointCopy({ ...pointCopy, name: ev.target.value })} value={pointCopy.name}></input>
                        <input onChange={ev => setPointCopy({ ...pointCopy, category: ev.target.value })} value={pointCopy.category} />
                        <textarea onChange={ev => setPointCopy({ ...pointCopy, description: ev.target.value })} rows={5} cols={40} value={pointCopy.description}></textarea>
                    </> :
                    <>
                        <h1>{point.name}</h1>
                        <h2>{point.category}</h2>
                        <p>{point.description}</p>
                    </>
            }

            <div className="flex gap-4 justify-between">
                <button onClick={onDelete ? _ => onDelete(point.id) : _ => { }} className="text-red-700">Delete Me!</button>
                <button onClick={_ => setEditable(!editable)}>Edit</button>
                <button disabled={!editable} onClick={onCommitChanges}>Commit Changes</button>
            </div>
        </Popup>
    </Marker>
}