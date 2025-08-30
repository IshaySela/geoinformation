import z from "zod";
import { POISchema, type POI } from "../Models/POI";


const GetAllPoisSchema = z.array(POISchema)
type GetAllPoisResponse = z.infer<typeof GetAllPoisSchema>

type CreateNewPoi = Omit<POI, "id">

export async function getAllPois(): Promise<GetAllPoisResponse> {
    const result = await fetch('/pois/all')
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

export async function createNewPoi(p: CreateNewPoi): Promise<boolean> {
    const result = await fetch('/pois/new', {
        headers: {
            "Content-Type": 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(p)
    })

    if (result.status === 200)
        return true;

    return false;
}