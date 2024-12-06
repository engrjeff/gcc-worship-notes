import { CopyLyricsButton } from "@/components/shared/copy-lyrics-button"

export function SongLyrics({ lyrics }: { lyrics: string }) {
  return (
    <>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-semibold">Lyrics</h2>
        <CopyLyricsButton lyrics={lyrics} />
      </div>
      <div
        id="gcc-song-lyrics"
        className="prose bg-background text-foreground prose-pre:bg-background prose-pre:px-0 prose-strong:text-foreground"
        dangerouslySetInnerHTML={{ __html: lyrics }}
      ></div>
    </>
  )
}
