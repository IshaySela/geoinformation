import { Marker, Popup } from "react-leaflet"
import type { POI } from "../Models/POI"
import { useEffect, useState } from "react"


export type PopiMarkerProps = {
    point: POI,
    onDelete?: (id: string) => void,
    onUpdate?: (copy: POI) => void
}

export default function PoiMarker({ point, onDelete, onUpdate }: PopiMarkerProps) {
    const [editable, setEditable] = useState(false)
    const [pointCopy, setPointCopy] = useState(structuredClone(point))

    // When closing edit mode, returned to old state
    useEffect(() => {
        setPointCopy(structuredClone(point))
    }, [editable])

    return <Marker key={point.id} position={[point.latitude, point.longitude]}>
        <Popup>
            {
                editable ?
                    <>
                        <input onChange={ev => setPointCopy({ ...pointCopy, name: ev.target.value })
                        } value={pointCopy.name}></input>

                        <textarea onChange={ev => setPointCopy({ ...pointCopy, description: ev.target.value })} rows={5} cols={40} value={pointCopy.description}></textarea>
                    </> :
                    <>
                        <h1>{point.name}</h1>
                        <p>{point.description}</p>
                    </>
            }

            <div className="flex gap-4 justify-between">
                <button onClick={onDelete ? _ => onDelete(point.id) : _ => { }} className="text-red-700">Delete Me!</button>
                <button onClick={_ => setEditable(!editable)}>Edit</button>
                <button disabled={!editable} onClick={onUpdate ? _ => onUpdate(pointCopy) : _ => {} }>Commit Changes</button>
            </div>
        </Popup>
    </Marker>
}