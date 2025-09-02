import z from "zod";
import { POISchema, type POI } from "../Models/POI";


export interface Problem { }
export type ApiResponse<T> = { success: true, data: T } | { success: false, problem: Problem }


export const CreateNewPoiResponseSchema = z.object({
    id: z.string()
})

export type CreateNewPoiResponse = z.infer<typeof CreateNewPoiResponseSchema>

export const GetAllPoisSchema = z.object({
    pois: z.array(POISchema)
})

export type GetAllPoisResponse = z.infer<typeof GetAllPoisSchema>

export type CreateNewPoi = Omit<POI, "id">

