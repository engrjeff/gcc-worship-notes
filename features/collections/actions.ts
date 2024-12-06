"use server"

import { revalidatePath } from "next/cache"
import { currentUser } from "@clerk/nextjs/server"

import prisma from "@/lib/db"
import { authActionClient } from "@/lib/safe-action"

import {
  addSongsToCollectionSchema,
  collectionSchema,
  requireCollectionId,
  updateCollectionSchema,
} from "./schema"

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

export const deleteCollection = authActionClient
  .metadata({ actionName: "deleteCollection" })
  .schema(requireCollectionId)
  .action(async ({ parsedInput: { id } }) => {
    const foundCol = await prisma.songCollection.findFirst({
      where: { id },
      select: { id: true },
    })

    if (!foundCol) throw new Error("Cannot find collection.")

    await prisma.songCollection.delete({
      where: {
        id,
      },
    })

    revalidatePath(`/collections`)

    return {
      status: "ok",
    }
  })

export const addSongsToCollection = authActionClient
  .metadata({ actionName: "addSongsToCollection" })
  .schema(addSongsToCollectionSchema)
  .action(async ({ parsedInput: { collectionId, songIds } }) => {
    const foundCol = await prisma.songCollection.findFirst({
      where: { id: collectionId },
      select: { id: true },
    })

    if (!foundCol) throw new Error("Cannot find collection.")

    const collection = await prisma.songCollection.update({
      where: {
        id: collectionId,
      },
      data: {
        songs: {
          connect: songIds.map((songId) => ({ id: songId })),
        },
      },
    })

    revalidatePath(`/collections`)
    revalidatePath(`/songs`)

    return {
      collection,
    }
  })
