import { NextResponse } from "next/server"

import prisma from "@/lib/db"

export const dynamic = "force-dynamic"

export async function GET() {
  try {
    const teamMembers = await prisma.teamMember.findMany()

    return NextResponse.json(teamMembers)
  } catch (error) {
    console.log("Get Team Members Error: ", error)

    return NextResponse.json([])
  }
}
