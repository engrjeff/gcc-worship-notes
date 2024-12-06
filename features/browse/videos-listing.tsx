"use client"

import { Song } from "@prisma/client"

import { formatDate } from "@/lib/utils"
import { YouTube } from "@/components/ui/youtube"

export function VideosListing({ songs }: { songs: Song[] }) {
  const sources = songs
    .map((song) => song.sources.map((src) => ({ source: src, song })))
    .flat()

  const youtubeVideoIds = sources
    .map((src) => {
      try {
        const u = src.source

        if (!u.includes("youtube.com")) return false

        const parsedUrl = new URL(u)

        const domain = parsedUrl.hostname

        if (!domain.includes("youtube.com")) return false

        const videoId = parsedUrl.searchParams.get("v")

        if (!videoId) return false

        return {
          videoId,
          song: src.song,
        }
      } catch {
        return false
      }
    })
    .filter(Boolean) as Array<{ videoId: string; song: Song }>

  if (!youtubeVideoIds.length) return null

  return (
    <ul className="space-y-6">
      {youtubeVideoIds?.map((video, idx) => (
        <li key={video.videoId + "-" + idx + 1}>
          <YouTube videoId={video.videoId} />
          <div className="py-4">
            <h3 className="font-semibold line-clamp-1">{video.song.title}</h3>
            <p className="text-muted-foreground text-sm">
              Listed {formatDate(video.song.createdAt)}
            </p>
          </div>
        </li>
      ))}
    </ul>
  )
}
