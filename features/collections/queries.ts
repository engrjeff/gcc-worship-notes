import prisma from "@/lib/db"

export interface GetCollectionsParams {
  q?: string
  sort?: string
  order?: string
}

export async function getSongCollections(args?: GetCollectionsParams) {
  const sortBy = args?.sort ? args.sort : "name"
  const orderBy = args?.order ? args.order : "asc"

  const collections = await prisma.songCollection.findMany({
    where: {
      name: {
        contains: args?.q,
        mode: "insensitive",
      },
    },
    include: {
      _count: {
        select: {
          songs: true,
        },
      },
    },
    orderBy: {
      [sortBy]: orderBy,
    },
  })

  return collections
}

export async function getRecentCollections() {
  const collections = await prisma.songCollection.findMany({
    take: 4,
    orderBy: {
      createdAt: "desc",
    },
  })

  return collections
}

export async function getCollectionById(id: string) {
  const collection = await prisma.songCollection.findUnique({
    where: { id },
    include: { songs: { include: { assignees: true } } },
  })

  return collection
}
