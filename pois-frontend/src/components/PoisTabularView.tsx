import { type JSX } from "react";
import { DataGrid, type Column } from "react-data-grid";
import type { POI } from "../Models/POI";


export type PoisTabularViewProps = {
    pois: POI[]
    focusDblClicked: (lat: number, lng: number) => void
}

export function PoisTabularView({ pois, focusDblClicked }: PoisTabularViewProps): JSX.Element {

    const columns: Column<POI>[] = [
        { key: 'id', name: 'ID', minWidth: 100, maxWidth: 500, renderCell: c => {
            const dblClick = () => focusDblClicked(c.row.latitude, c.row.longitude)
            return <p onDoubleClick={dblClick} ><span role="img" aria-label="pin">📌</span> {c.row.id}</p>
        } },
        { key: 'name', name: 'Name', editable: true, editorOptions: {}},
        { key: 'description', name: 'Description', editable: true },
        { key: 'longitude', name: 'Longitude' },
        { key: 'latitude', name: 'Latitude' }
    ]

    return <>
        <DataGrid
            rows={pois}
            defaultColumnOptions={{
                resizable: true,
                sortable: true
            }}
            columns={columns} />
    </>
}