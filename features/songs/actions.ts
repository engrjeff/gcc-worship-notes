"use server";

import prisma from "@/lib/db";
import { authActionClient } from "@/lib/safe-action";

import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { requireSongId, songSchema, updateSongSchema } from "./schema";

export const createSongNote = authActionClient
  .metadata({ actionName: "createSongNote" })
  .schema(songSchema)
  .action(async ({ parsedInput, ctx: { user } }) => {
    const signedInUser = await currentUser();

    if (!signedInUser) throw new Error("Session not found.");

    const song = await prisma.song.create({
      data: {
        ...parsedInput,
        sources: parsedInput.sources.map((s) => s.url),
        createdByName: signedInUser?.fullName as string,
        createdBy: user.userId,
        assignees: {
          connect: parsedInput.assignees.map((a) => ({ id: a.id })),
        },
      },
      select: {
        id: true,
      },
    });

    revalidatePath("/songs");

    return {
      song,
    };
  });

export const updateSongNote = authActionClient
  .metadata({ actionName: "updateSongNote" })
  .schema(updateSongSchema)
  .action(async ({ parsedInput: { id, ...data }, ctx: { user } }) => {
    const signedInUser = await currentUser();

    if (!signedInUser) throw new Error("Session not found.");

    const song = await prisma.song.update({
      where: { id },
      data: {
        ...data,
        sources: data.sources.map((s) => s.url),
        updatedByName: signedInUser?.fullName as string,
        updatedBy: user.userId,
        assignees: {
          set: [],
          connect: data.assignees.map((a) => ({ id: a.id })),
        },
      },
      select: {
        id: true,
      },
    });

    revalidatePath("/songs");

    return {
      song,
    };
  });

export const deleteSongNote = authActionClient
  .metadata({ actionName: "deleteSongNote" })
  .schema(requireSongId)
  .action(async ({ parsedInput: { id } }) => {
    const foundSong = await prisma.song.findFirst({
      where: { id },
      select: { id: true },
    });

    if (!foundSong) throw new Error("Cannot find song.");

    await prisma.song.delete({
      where: {
        id,
      },
    });

    revalidatePath(`/songs`);

    return {
      status: "ok",
    };
  });
