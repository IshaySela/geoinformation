import { type POI } from "../Models/POI";
import { CreateNewPoiResponseSchema, GetAllPoisSchema, ProblemResponseSchema, type ApiResponse, type CreateNewPoi, type CreateNewPoiResponse, type GetAllPoisResponse } from "./Api";

const apiUrl = ((): string => {
    const envUrl = import.meta.env.VITE_API_URL
    return envUrl ? envUrl : ''
})()


export interface PoiService {
    getAllPois(): Promise<ApiResponse<GetAllPoisResponse>>
    createNewPoi(p: CreateNewPoi): Promise<ApiResponse<CreateNewPoiResponse>>
    deletePoi(id: string): Promise<boolean>
    updatePoi(poi: POI): Promise<ApiResponse<void>>
}


async function getAllPois(): Promise<ApiResponse<GetAllPoisResponse>> {
    const result = await fetch(`${apiUrl}/pois/all`)
    let pois: GetAllPoisResponse = {
        pois: []
    }
    let asJson: unknown

    asJson = await result.json() // If fail, buble exception up

    const parsed = GetAllPoisSchema.safeParse(asJson)

    if (parsed.success) {
        pois = parsed.data;
    }
    else {
        console.error("Invalid response from server: ", { pois: pois, errors: parsed.error })
        throw Error("Recived unexpected response from the server")
    }

    return {
        success: true,
        resp: pois
    }
}

async function createNewPoi(p: CreateNewPoi): Promise<ApiResponse<CreateNewPoiResponse>> {
    const result = await fetch(`${apiUrl}/pois/new`, {
        headers: {
            "Content-Type": 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(p)
    })

    // if the operation was not a success, parse the problem and return
    if (!result.ok) {
        const problem = ProblemResponseSchema.parse(await result.json())

        return {
            success: false,
            problem: {
                title: problem.title
            }
        }
    }

    const asJson = await result.json()
    const parseResult = CreateNewPoiResponseSchema.safeParse(asJson)

    if (!parseResult.success) {
        console.error('Recived unexpceted response from server', parseResult.error)
        throw Error('Recived unexpcted response from server')
    }

    return {
        success: true,
        resp: parseResult.data
    }
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

    if (resp !== undefined && resp.ok)
        return true

    // add notification, problem, etc.
    return false
}

async function updatePoi(poi: POI): Promise<ApiResponse<void>> {
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
        throw error;
    }

    if (resp.ok) {
        return { success: true }
    }

    const problemResponse: unknown = await resp.json()

    const body = ProblemResponseSchema.parse(problemResponse)

    return {
        success: false,
        problem: {
            title: body.title
        }
    }
}

const PoiService: PoiService = {
    createNewPoi: createNewPoi,
    deletePoi: deletePoi,
    getAllPois: getAllPois,
    updatePoi: updatePoi,
}

export default PoiService