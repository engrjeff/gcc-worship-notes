"use client"

import { SongCollection } from "@prisma/client"
import { useQuery } from "@tanstack/react-query"

import { apiClient } from "@/lib/api-client"

async function getCollections() {
  const response = await apiClient.get<SongCollection[]>("/collections")

  return response.data
}

export function useSongCollections() {
  return useQuery({
    queryKey: ["song-collections"],
    queryFn: getCollections,
  })
}
