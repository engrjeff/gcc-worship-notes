import { CopyLyricsButton } from "@/components/shared/copy-lyrics-button"

export function SongLyrics({ lyrics }: { lyrics: string }) {
  return (
    <>
      <div className="flex items-center justify-between mb-4">
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
