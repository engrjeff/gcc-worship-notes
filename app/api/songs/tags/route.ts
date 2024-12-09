import { NextResponse } from "next/server"

import prisma from "@/lib/db"

export const dynamic = "force-dynamic"

export async function GET() {
  try {
    const songs = await prisma.song.findMany({
      orderBy: {
        createdAt: "desc",
      },
    })

    const properWords = [
      "God",
      "Jesus",
      "Christ",
      "Holy Spirit",
      "Father",
      "lamb of God",
      "Lamb of God",
    ]

    const tags = new Set(
      songs
        .map((s) =>
          s.tags.map((t) => (properWords.includes(t) ? t : t.toLowerCase()))
        )
        .flat()
        .slice(0, 20)
    )
    return NextResponse.json(Array.from(tags))
  } catch (error) {
    console.log("Get Song Tags Error: ", error)

    return NextResponse.json([])
  }
}
