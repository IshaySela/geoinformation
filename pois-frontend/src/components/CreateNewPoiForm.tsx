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

    return <div>
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
                
                if(result.success) {
                    onSubmit(result.data)
                }
            }}>
            <Field.Root name={NAME_FIELD}>
                <Field.Control type="text" required />
                <Field.Error />
            </Field.Root>
            <Field.Root name={DESCRIPTION_FIELD}>
                <Field.Control type="text" required />
                <Field.Error />
            </Field.Root>

            <Field.Root name={CATEGORY_FIELD}>
                <Field.Control type="text" required />
                <Field.Error />
            </Field.Root>

            <Field.Root name={LAT_FIELD}>
                <Field.Control type="number" required pattern="^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?)$" />
                <Field.Error />
            </Field.Root>

            <Field.Root name={LNG_FIELD}>
                <Field.Control type="number" required pattern="^[-+]?((1[0-7]\d(\.\d+)?|180(\.0+)?|(\d{1,2}(\.\d+)?)))$" />
                <Field.Error />
            </Field.Root>

            <button type="submit"></button>
        </Form>
    </div>
}