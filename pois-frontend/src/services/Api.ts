import z from "zod";
import { POISchema, type POI } from "../Models/POI";


export const ProblemResponseSchema = z.object({
    title: z.string()
})

export type Problem = z.infer<typeof ProblemResponseSchema>

export type ApiResponse<T = void> =
  | (T extends void ? { success: true } : { success: true; resp: T })
  | { success: false; problem: Problem };

export const CreateNewPoiResponseSchema = z.object({
    id: z.string()
})


export type CreateNewPoiResponse = z.infer<typeof CreateNewPoiResponseSchema>

export const GetAllPoisSchema = z.object({
    pois: z.array(POISchema)
})

export type GetAllPoisResponse = z.infer<typeof GetAllPoisSchema>

export type CreateNewPoi = Omit<POI, "id">

