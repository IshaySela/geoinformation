import { useState, type JSX } from "react";
import { DataGrid, type Column } from "react-data-grid";
import type { POI } from "../Models/POI";
import { Dialog } from "@base-ui-components/react/dialog";
import CreateNewPoiForm from "./CreateNewPoiForm";


export type PoisTabularViewProps = {
    pois: POI[]
    focusClicked: (lat: number, lng: number) => void
    onDeleteClicked: (id: string) => void
    onUpdateClicked: (poi: POI) => void
}

export function PoisTabularView({ pois, focusClicked, onDeleteClicked, onUpdateClicked }: PoisTabularViewProps): JSX.Element {
    const [editState, setEditState] = useState<{ editing: true, poi: POI } | { editing: false, poi: undefined }>({
        editing: false,
        poi: undefined
    })

    const columns: Column<POI>[] = [
        { key: 'id', name: 'ID', minWidth: 100, maxWidth: 500 },
        { key: 'name', name: 'Name', editable: true, editorOptions: {} },
        { key: 'description', name: 'Description', editable: true },
        { key: 'longitude', name: 'Longitude' },
        { key: 'latitude', name: 'Latitude' },
        {
            key: 'Actions', name: 'Actions', renderCell: c => {
                const deleteClick = () => onDeleteClicked(c.row.id)
                const updateClick = () => {
                    setEditState({ poi: c.row, editing: true })
                }

                return <div className="flex justify-between px-1.5">
                    <span role="img" aria-label="delete" onClick={deleteClick}>❌</span>
                    <span role="img" aria-label="update" onClick={updateClick}>✏️</span>
                </div>
            }
        }
    ]

    return <>
        <DataGrid
            rows={pois}
            onCellDoubleClick={c => focusClicked(c.row.latitude, c.row.longitude)}
            defaultColumnOptions={{
                resizable: true,
                sortable: true
            }}
            columns={columns} />

        { /** Edit POI Form */}
        <Dialog.Root
            open={editState.editing}>
            <Dialog.Portal>
                <Dialog.Backdrop className="fixed inset-0 bg-black opacity-20 transition-all duration-150 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0 dark:opacity-70" />
                <Dialog.Popup className="fixed top-1/2 left-1/2 -mt-8 w-96 max-w-[calc(100vw-3rem)] -translate-x-1/2 -translate-y-1/2 rounded-lg bg-gray-50 p-6 text-gray-900 outline-1 outline-gray-200 transition-all duration-150 data-[ending-style]:scale-90 data-[ending-style]:opacity-0 data-[starting-style]:scale-90 data-[starting-style]:opacity-0 dark:outline-gray-300">
                    <Dialog.Title className="-mt-1.5 mb-1 text-lg font-medium">
                        Notifications
                    </Dialog.Title>

                    <CreateNewPoiForm
                        category={editState.poi?.category}
                        description={editState.poi?.description}
                        name={editState.poi?.name}
                        id={editState.poi?.id}
                        latitude={editState.editing ? editState.poi.latitude : 0}
                        longitude={editState.editing ? editState.poi.longitude : 0}
                        onSubmit={onUpdateClicked}
                    />
                    <div className="flex justify-end gap-4">
                        <Dialog.Close
                            onClick={_ => setEditState({ poi: undefined, editing: false })}
                            className="flex h-10 items-center justify-center rounded-md border border-gray-200 bg-gray-50 px-3.5 text-base font-medium text-gray-900 select-none hover:bg-gray-100 focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-blue-800 active:bg-gray-100">
                            Close
                        </Dialog.Close>
                    </div>
                </Dialog.Popup>
            </Dialog.Portal>
        </Dialog.Root>
    </>
}