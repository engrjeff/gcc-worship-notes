import prisma from "@/lib/db"

export async function getSongCollections() {
  const collections = await prisma.songCollection.findMany({
    include: {
      _count: {
        select: {
          songs: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
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
    include: { songs: true },
  })

  return collection
}
