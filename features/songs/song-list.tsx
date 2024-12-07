import { getSongs, GetSongsParams } from "./queries"
import { SongListItem } from "./song-list-item"

export async function SongList({
  songParams,
}: {
  songParams?: GetSongsParams
}) {
  const songs = await getSongs(songParams)

  if (!songs.length && songParams?.q)
    return (
      <div className="mt-4 flex h-[300px] flex-col items-center justify-center border border-dashed p-4">
        <p className="text-muted-foreground text-center">
          {`No songs found for "${songParams.q}"`}
        </p>
      </div>
    )

  if (!songs.length)
    return (
      <div className="mt-4 flex h-[300px] flex-col items-center justify-center border border-dashed p-4">
        <p className="text-muted-foreground text-center">
          No songs listed yet. Add one now.
        </p>
      </div>
    )

  return (
    <ul className="space-y-3 py-4 pb-6">
      {songs.map((song) => (
        <li key={song.id}>
          <SongListItem song={song} />
        </li>
      ))}
    </ul>
  )
}
