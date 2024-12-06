import { NextResponse } from "next/server"

import prisma from "@/lib/db"

export const dynamic = "force-dynamic"

export async function GET() {
  try {
    const collections = await prisma.songCollection.findMany({
      orderBy: {
        createdAt: "desc",
      },
    })

    return NextResponse.json(collections)
  } catch (error) {
    console.log("Get Collections Error: ", error)

    return NextResponse.json([])
  }
}
