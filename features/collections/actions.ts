"use server"

import { revalidatePath } from "next/cache"
import { currentUser } from "@clerk/nextjs/server"

import prisma from "@/lib/db"
import { authActionClient } from "@/lib/safe-action"

import { collectionSchema, updateCollectionSchema } from "./schema"

export const createCollection = authActionClient
  .metadata({ actionName: "createCollection" })
  .schema(collectionSchema)
  .action(async ({ parsedInput, ctx: { user } }) => {
    const signedInUser = await currentUser()

    if (!signedInUser) throw new Error("Session not found.")

    const collection = await prisma.songCollection.create({
      data: {
        name: parsedInput.name,
        createdByName: signedInUser?.fullName as string,
        createdBy: user.userId,
      },
      select: {
        id: true,
      },
    })

    revalidatePath("/collections")

    return {
      collection,
    }
  })

export const updateCollection = authActionClient
  .metadata({ actionName: "updateCollection" })
  .schema(updateCollectionSchema)
  .action(async ({ parsedInput, ctx: { user } }) => {
    const signedInUser = await currentUser()

    if (!signedInUser) throw new Error("Session not found.")

    const collection = await prisma.songCollection.update({
      where: {
        id: parsedInput.id,
      },
      data: {
        name: parsedInput.name,
        updatedByName: signedInUser?.fullName as string,
        updatedBy: user.userId,
      },
      select: {
        id: true,
      },
    })

    revalidatePath("/collections")

    return {
      collection,
    }
  })
