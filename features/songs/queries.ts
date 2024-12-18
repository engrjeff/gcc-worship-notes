import prisma from "@/lib/db"

export interface GetSongsParams {
  q?: string
  chord?: string
  assignee?: string
  collectionId?: string
  view?: string
  tag?: string
}

export async function getSongs(args?: GetSongsParams) {
  const songs = await prisma.song.findMany({
    where: {
      title: {
        contains: args?.q,
        mode: "insensitive",
      },
      chordKey: {
        equals: args?.chord,
      },
      assignees: {
        some: {
          id: {
            equals: args?.assignee,
          },
        },
      },
      collections: args?.collectionId
        ? {
            some: {
              id: {
                equals: args?.collectionId,
              },
            },
          }
        : undefined,
      tags: args?.tag
        ? {
            has: args.tag,
          }
        : undefined,
    },
    include: { assignees: true },
    orderBy: { title: "asc" },
  })

  return songs
}

export async function getSongById(id: string) {
  const song = await prisma.song.findUnique({
    where: { id },
    include: { assignees: true },
  })

  return song
}
