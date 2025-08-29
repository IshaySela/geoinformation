import * as z from 'zod'

export const POISchema = z.object({
    id: z.string(),
    category: z.string(),
    name: z.string(),
    description: z.string(),
    latitude: z.number(),
    longitude: z.number()
})

export type POI = z.infer<typeof POISchema>;