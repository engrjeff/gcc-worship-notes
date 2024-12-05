import { getSongs } from "./queries"
import { SongListItem } from "./song-list-item"

export async function SongList() {
  const songs = await getSongs()

  return (
    <ul className="space-y-3 py-6">
      {songs.map((song) => (
        <li key={song.id}>
          <SongListItem song={song} />
        </li>
      ))}
    </ul>
  )
}
