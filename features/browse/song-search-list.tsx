import Link from "next/link"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Card,
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
      <h1 className="font-semibold">Worship Songs</h1>
      <p className="text-muted-foreground text-sm mb-6">
        Showing {songs.length} {songs.length > 1 ? "songs" : "song"}.
      </p>
      <ul className="space-y-3">
        {songs.map((song) => (
          <li key={`song-${song.id}`}>
            <Link
              key={`search-song-${song.id}`}
              href={`/browse/songs/${song.id}`}
            >
              <Card className="bg-muted/30 hover:bg-muted border-none transition-colors">
                <CardHeader className="flex-row items-start">
                  <div>
                    <CardTitle>
                      <h2>{song.title}</h2>
                    </CardTitle>
                    <CardDescription>
                      Listed by {song.createdByName}
                    </CardDescription>
                    <Badge variant="primary">Key of {song.chordKey}</Badge>
                  </div>
                  <div className="ml-auto flex -space-x-1 overflow-hidden">
                    {song.assignees.map((assignee) => (
                      <Avatar
                        key={assignee.id}
                        className="ring-background inline-block size-6 ring-2"
                      >
                        <AvatarImage
                          src={assignee.imageUrl!}
                          alt=""
                          className="object-contain"
                        />
                        <AvatarFallback className="text-xs">
                          {assignee.name
                            .split(" ")
                            .map((s) => s.substring(0, 1))
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                    ))}
                  </div>
                </CardHeader>
              </Card>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
