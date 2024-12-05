import * as z from "zod"

export const collectionSchema = z.object({
  name: z
    .string({ required_error: "Name is required." })
    .min(1, { message: "Name is required." }),
})

export type CollectionInputs = z.infer<typeof collectionSchema>
