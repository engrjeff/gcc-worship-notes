import { CopyLyricsButton } from "@/components/shared/copy-lyrics-button"

import { DownloadLyricsButton } from "./download-lyrics-button"

export function SongLyrics({
  lyrics,
  songTitle,
}: {
  lyrics: string
  songTitle: string
}) {
  return (
    <>
      <div className="mb-4 space-y-4">
        <h2 className="font-semibold">Lyrics</h2>
        <div className="ml-auto space-x-3">
          <CopyLyricsButton lyrics={lyrics} />
          <DownloadLyricsButton songTitle={songTitle} />
        </div>
      </div>
      <div
        id="gcc-song-lyrics"
        className="prose prose-p:my-3 bg-background text-foreground prose-pre:bg-background prose-pre:px-0 prose-pre:m-0 prose-strong:text-foreground"
      >
        <p className="text-lg font-semibold">{songTitle}</p>
        <div dangerouslySetInnerHTML={{ __html: lyrics }}></div>
      </div>
    </>
  )
}
