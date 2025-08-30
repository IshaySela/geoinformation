import type { JSX } from "react";
import { POISchema, type POI } from "../Models/POI";
import { Field, Form } from "@base-ui-components/react";


export type CreateNewPoiFormProps = {
    lat: number
    lng: number
    onSubmit: (poi: POI) => void
}

export default function CreateNewPoiForm({ onSubmit, lat, lng }: CreateNewPoiFormProps): JSX.Element {
    const NAME_FIELD = 'name'
    const DESCRIPTION_FIELD = 'desc'
    const CATEGORY_FIELD = 'category'
    const LAT_FIELD = 'lat'
    const LNG_FIELD = 'lng'
    const inputClass =
        "border-b border-gray-400 focus:border-blue-500 focus:outline-none py-1 px-0";
    const errorClass = "text-red-500 text-xs mt-1 h-10";
    const labelClass = "block text-sm font-medium mb-1 text-gray-700";



    return <>
        <Form
            onSubmit={ev => {
                ev.preventDefault()
                const form = new FormData(ev.currentTarget)
                const description = form.get(DESCRIPTION_FIELD)?.toString()
                const name = form.get(NAME_FIELD)?.toString()
                const category = form.get(CATEGORY_FIELD)?.toString()

                const poi: Partial<POI> = {
                    name: name,
                    category: category,
                    description: description,
                    id: '',
                    latitude: lat,
                    longitude: lng
                }
                const result = POISchema.safeParse(poi)

                if (result.success) {
                    onSubmit(result.data)
                    form.forEach((_, key) => form.delete(key))
                }
            }}>


            <Field.Root name={NAME_FIELD}>
                <Field.Label className={labelClass}>Name</Field.Label>
                <Field.Control type="text" required className={inputClass} />
                <Field.Error className={errorClass} />
            </Field.Root>

            <Field.Root name={DESCRIPTION_FIELD}>
                <Field.Label className={labelClass}>Description</Field.Label>
                <Field.Control type="text" required className={inputClass} />
                <Field.Error className={errorClass} />
            </Field.Root>

            <Field.Root name={CATEGORY_FIELD}>
                <Field.Label className={labelClass}>Category</Field.Label>
                <Field.Control type="text" required className={inputClass} />
                <Field.Error className={errorClass} />
            </Field.Root>

            <Field.Root name={LAT_FIELD}>
                <Field.Label className={labelClass}>Latitude</Field.Label>
                <Field.Control
                    type="number"
                    required
                    className={inputClass}
                    value={lat}
                    disabled
                />
                <Field.Error className={errorClass} />
            </Field.Root>

            <Field.Root name={LNG_FIELD}>
                <Field.Label className={labelClass}>Longitude</Field.Label>
                <Field.Control
                    type="number"
                    required
                    value={lng}
                    disabled
                    className={inputClass}
                />
                <Field.Error className={errorClass} />
            </Field.Root>

            <button type="submit">Submit</button>
            <button type="reset">Clear</button>
        </Form>
    </>
}