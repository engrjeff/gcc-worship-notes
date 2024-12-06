import * as z from "zod"

export const collectionSchema = z.object({
  name: z
    .string({ required_error: "Name is required." })
    .min(1, { message: "Name is required." }),
})

export const requireCollectionId = z.object({
  id: z.string({
    required_error: "Collection id is required.",
  }),
})

export const updateCollectionSchema =
  collectionSchema.merge(requireCollectionId)

export const addSongsToCollectionSchema = z.object({
  collectionId: z.string(),
  songIds: z.string().array(),
})

export type CollectionInputs = z.infer<typeof collectionSchema>
