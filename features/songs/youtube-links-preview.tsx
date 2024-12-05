"use client"

import { YouTube } from "@/components/ui/youtube"

export function YouTubeLinksPreviews({
  urls,
  className,
}: {
  urls: string[]
  className?: string
}) {
  const youtubeVideoIds = urls
    .map((u) => {
      try {
        if (!u.includes("youtube.com")) return false

        const parsedUrl = new URL(u)

        const domain = parsedUrl.hostname

        if (!domain.includes("youtube.com")) return false

        const videoId = parsedUrl.searchParams.get("v")

        if (!videoId) return false

        return videoId
      } catch {
        return false
      }
    })
    .filter(Boolean)

  if (!youtubeVideoIds.length) return null

  return (
    <>
      <p className="mb-3 font-semibold">YouTube Preview</p>
      <div className={className}>
        {youtubeVideoIds?.map((videoId, idx) => (
          <YouTube
            key={videoId + "-" + idx + 1}
            videoId={videoId as string}
            className="border"
          />
        ))}
      </div>
    </>
  )
}
