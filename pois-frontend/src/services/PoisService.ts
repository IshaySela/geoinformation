import { type POI } from "../Models/POI";
import { CreateNewPoiResponseSchema, GetAllPoisSchema, ProblemResponseSchema, type ApiResponse, type CreateNewPoi, type CreateNewPoiResponse, type GetAllPoisResponse, type Problem } from "./Api";

const apiUrl = ((): string => {
    const envUrl = import.meta.env.VITE_API_URL
    return envUrl ? envUrl : ''
})()


export interface PoiService {
    getAllPois(): Promise<ApiResponse<GetAllPoisResponse>>
    createNewPoi(p: CreateNewPoi): Promise<ApiResponse<CreateNewPoiResponse>>
    deletePoi(id: string): Promise<ApiResponse>
    updatePoi(poi: POI): Promise<ApiResponse>
}


async function getAllPois(): Promise<ApiResponse<GetAllPoisResponse>> {
    const result = await fetch(`${apiUrl}/pois/all`)
    let asJson: unknown

    asJson = await result.json() // If fail, buble exception up

    const parsed = GetAllPoisSchema.safeParse(asJson)
    
    if (parsed.success) {
        return {
            success: true,
            resp: parsed.data
        }
    }

    return createProblemFromBadRequest(result)
}

async function createNewPoi(p: CreateNewPoi): Promise<ApiResponse<CreateNewPoiResponse>> {
    const result = await fetch(`${apiUrl}/pois/new`, {
        headers: {
            "Content-Type": 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(p)
    })

    if (!result.ok)
        return createProblemFromBadRequest(result)

    const asJson = await result.json()
    const parseResult = CreateNewPoiResponseSchema.parse(asJson)

    return {
        success: true,
        resp: parseResult
    }
}

async function deletePoi(id: string): Promise<ApiResponse> {
    const resp = await fetch(`${apiUrl}/pois/delete?id=${id}`, {
        method: 'delete'
    })

    if (resp !== undefined && resp.ok)
        return { success: true }

    return createProblemFromBadRequest(resp)
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

    resp = await fetch(`${apiUrl}/pois/update?id=${poi.id}`, {
        method: 'put',
        body: JSON.stringify(updateBody),
        headers: {
            'Content-Type': 'application/json'
        }
    })


    if (resp.ok) {
        return { success: true }
    }

    return createProblemFromBadRequest(resp)
}

/**
 * The function createProblemFromBadRequest gets a response, and parses the body as a problem. 
 * @note resp object should not be read before calling this function!
 * @param resp The response from the pois server.
 * @returns A problem. if the body is not a problem, an error is thrown.
 */
async function createProblemFromBadRequest<T = void>(resp: Response): Promise<ApiResponse<T>> {
    if (resp.bodyUsed) {
        throw Error("Cannot create problem from used response");
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