import prisma from "@/lib/db"

export interface GetSongsParams {
  q?: string
  chord?: string
  assignee?: string
  collectionId?: string
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
      collections: {
        some: {
          id: {
            equals: args?.collectionId,
          },
        },
      },
    },
    include: { assignees: true },
    orderBy: { createdAt: "desc" },
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
