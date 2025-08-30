import z from "zod";


export const CreateNewPoiResponseSchema = z.object({
    id: z.string()
})

export type CreateNewPoiResponse =  z.infer<typeof CreateNewPoiResponseSchema>