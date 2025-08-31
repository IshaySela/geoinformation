import z from "zod";
import { POISchema, type POI } from "../Models/POI";
import { CreateNewPoiResponseSchema } from "./Api";

const apiUrl = ((): string => {
    const envUrl = import.meta.env.VITE_API_URL
    return envUrl ? envUrl : ''
})()

export interface PoiService {
    getAllPois(): Promise<GetAllPoisResponse>
    createNewPoi(p: CreateNewPoi): Promise<CreateNewPoiResponse>
    deletePoi(id: string): Promise<boolean>
    updatePoi(poi: POI): Promise<boolean>
}
const GetAllPoisSchema = z.array(POISchema)
type GetAllPoisResponse = z.infer<typeof GetAllPoisSchema>

type CreateNewPoi = Omit<POI, "id">

export type CreateNewPoiResponse = { id: string }

async function getAllPois(): Promise<GetAllPoisResponse> {
    const result = await fetch(`${apiUrl}/pois/all`)
    let pois: GetAllPoisResponse = []
    let asJson: unknown

    try {
        asJson = await result.json()
    } catch (error) {
        // TODO: add error handling
    }

    const parsed = GetAllPoisSchema.safeParse(asJson)

    if (parsed.success) {
        pois = parsed.data;
    }
    else {
        console.error("Invalid response from server: ", pois)
    }

    return pois
}

async function createNewPoi(p: CreateNewPoi): Promise<CreateNewPoiResponse> {
    const result = await fetch(`${apiUrl}/pois/new`, {
        headers: {
            "Content-Type": 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(p)
    })

    if (!result.ok)
        throw Error('Error while creating new POI')

    const asJson = await result.json()
    const parseResult = CreateNewPoiResponseSchema.safeParse(asJson)

    if (!parseResult.success) {
        console.error('Recived unexpceted response from server', parseResult.error)
        throw Error('Recived unexpcted response from server')
    }

    return parseResult.data
}

async function deletePoi(id: string): Promise<boolean> {
    const prm = fetch(`${apiUrl}/pois/delete?id=${id}`, {
        method: 'delete'
    })
    let resp: Response | undefined = undefined

    try {
        resp = await prm
    } catch (error) {
        // handle error state
    }

    if (resp !== undefined && resp.status === 200)
        return true

    // add notification, problem, etc.
    return false
}

async function updatePoi(poi: POI): Promise<boolean> {
    const updateBody: Omit<POI, "id"> = {
        category: poi.category,
        description: poi.description,
        latitude: poi.latitude,
        longitude: poi.longitude,
        name: poi.name
    }

    let resp: Response

    try {
        resp = await fetch(`${apiUrl}/pois/update?id=${poi.id}`, {
            method: 'put',
            body: JSON.stringify(updateBody),
            headers: {
                'Content-Type': 'application/json'
            }
        })

    } catch (error) {
        // error occured
        console.error('Error occured while updating POI ', poi.id, error)
        return false
    }

    return resp.ok
}

const PoiService: PoiService = {
    createNewPoi: createNewPoi,
    deletePoi: deletePoi,
    getAllPois: getAllPois,
    updatePoi: updatePoi,
}

export default PoiService