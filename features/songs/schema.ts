import * as z from "zod"

export const songSchema = z.object({
  title: z
    .string({ required_error: "Title is required." })
    .min(2, { message: "Title is required." }),
  assignees: z
    .array(z.object({ id: z.string() }))
    .min(1, { message: "At least 1 assignee is required." }),
  lyrics: z
    .string({ required_error: "Lyrics is required." })
    .min(10, { message: "Lyrics is required." }),
  chordKey: z.string(),
  sources: z.array(z.object({ url: z.string().url() })),
})

export const requireSongId = z.object({
  id: z.string({
    required_error: "Song id is required.",
  }),
})

export const updateSongSchema = songSchema.merge(requireSongId)

export type SongInputs = z.infer<typeof songSchema>
