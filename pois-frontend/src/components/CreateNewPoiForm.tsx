import { useState, type JSX } from "react";
import { POISchema, type POI } from "../Models/POI";
import { Field, Form } from "@base-ui-components/react";
import { toast } from "react-toastify";


export type CreateNewPoiFormProps = {
    latitude: number
    longitude: number
    onSubmit: (poi: POI) => void
} & Partial<POI>


export default function CreateNewPoiForm(props: CreateNewPoiFormProps): JSX.Element {
    const NAME_FIELD = 'name'
    const DESCRIPTION_FIELD = 'desc'
    const CATEGORY_FIELD = 'category'
    const LAT_FIELD = 'lat'
    const LNG_FIELD = 'lng'
    const inputClass = "border-b border-gray-400 focus:border-blue-500 focus:outline-none py-1 px-0";
    const errorClass = "text-red-500 text-xs mt-1 h-10";
    const labelClass = "block text-sm font-medium mb-1 text-gray-700";


    const [formState, setFormState] = useState<Partial<POI>>({ ...props })

    return <>
        <Form
            onSubmit={ev => {
                ev.preventDefault()
                const form = new FormData(ev.currentTarget)
                formState.id = formState.id ? formState.id : ''; // allow for forms without id

                const result = POISchema.safeParse(formState)
                
                if (result.success) {
                    props.onSubmit(result.data)
                    form.forEach((_, key) => form.delete(key))
                }

                else {
                    console.error('Error while parsing form data', formState, result)
                    toast.error('Error while parsing form data')
                }
            }}>

            {
                props.id ? <Field.Root name="id">
                    <Field.Label className={labelClass}>ID</Field.Label>
                    <Field.Control disabled value={props.id} type="text" required className={inputClass} />
                    <Field.Error className={errorClass} />
                </Field.Root> : <></>
            }
            <Field.Root name={NAME_FIELD}>
                <Field.Label className={labelClass}>Name</Field.Label>
                <Field.Control value={formState.name ? formState.name : ''} onChange={e => { setFormState({ ...formState, name: e.currentTarget.value }) }} type="text" required className={inputClass} />
                <Field.Error className={errorClass} />
            </Field.Root>

            <Field.Root name={DESCRIPTION_FIELD}>
                <Field.Label className={labelClass}>Description</Field.Label>
                <Field.Control onChange={e => { setFormState({ ...formState, description: e.currentTarget.value }) }} value={formState.description ? formState.description : ''} type="text" required className={inputClass} />
                <Field.Error className={errorClass} />
            </Field.Root>

            <Field.Root name={CATEGORY_FIELD}>
                <Field.Label className={labelClass}>Category</Field.Label>
                <Field.Control value={formState.category ? formState.category : ''} onChange={e => { setFormState({ ...formState, category: e.currentTarget.value }) }} type="text" required className={inputClass} />
                <Field.Error className={errorClass} />
            </Field.Root>

            <Field.Root name={LAT_FIELD}>
                <Field.Label className={labelClass}>Latitude</Field.Label>
                <Field.Control
                    type="number"
                    required
                    className={inputClass}
                    value={props.latitude}
                    disabled
                />
                <Field.Error className={errorClass} />
            </Field.Root>

            <Field.Root name={LNG_FIELD}>
                <Field.Label className={labelClass}>Longitude</Field.Label>
                <Field.Control
                    type="number"
                    required
                    value={props.longitude}
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