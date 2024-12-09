"use client"

import { useQuery } from "@tanstack/react-query"

import { apiClient } from "@/lib/api-client"

async function getSongTags() {
  const response = await apiClient.get<string[]>("/songs/tags")

  return response.data
}

export function useSongTags() {
  return useQuery({
    queryKey: ["song-tags"],
    queryFn: getSongTags,
  })
}
