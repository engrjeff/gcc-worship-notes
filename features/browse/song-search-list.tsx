import Link from "next/link"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { getSongs, GetSongsParams } from "../songs/queries"
import { NotResultsFoundView } from "./no-results-found-view"

export async function SongSearchList({
  songsParams,
}: {
  songsParams?: GetSongsParams
}) {
  const songs = await getSongs(songsParams)

  if (!songs?.length) return <NotResultsFoundView query={songsParams?.q} />

  return (
    <div>
      <h2 className="font-semibold">Worship Songs</h2>
      <p className="text-muted-foreground mb-6 text-sm">
        Showing {songs.length} {songs.length > 1 ? "songs" : "song"}.
      </p>
      <ul className="space-y-3">
        {songs.map((song) => (
          <li key={`search-song-${song.id}`}>
            <Link href={`/browse/songs/${song.id}`} prefetch>
              <Card className="bg-muted/30 hover:bg-muted border-none transition-colors">
                <CardHeader className="items-start">
                  <CardTitle>
                    <h2>{song.title}</h2>
                  </CardTitle>
                  <CardDescription>
                    Listed by {song.createdByName}
                  </CardDescription>
                  <Badge variant="primary">Key of {song.chordKey}</Badge>
                </CardHeader>
                <CardContent>
                  <h3 className="text-sm font-medium">Assignees</h3>
                  {song.assignees.map((a) => (
                    <p key={`${song.id}-${a.id}`} className="text-sm">
                      {a.name}
                    </p>
                  ))}
                </CardContent>
              </Card>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
