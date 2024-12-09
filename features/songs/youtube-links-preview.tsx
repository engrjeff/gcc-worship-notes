"use client"

import { getYouTubeVideoIds } from "@/lib/utils"
import { YouTube } from "@/components/ui/youtube"

export function YouTubeLinksPreviews({
  urls,
  className,
}: {
  urls: string[]
  className?: string
}) {
  const youtubeVideoIds = getYouTubeVideoIds(urls)

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
