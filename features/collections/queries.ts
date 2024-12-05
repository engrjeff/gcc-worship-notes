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
  })

  return collections
}

export async function getRecentCollections() {
  const collections = await prisma.songCollection.findMany({
    take: 2,
    orderBy: {
      createdAt: "desc",
    },
  })

  return collections
}
