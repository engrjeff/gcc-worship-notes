import Link from "next/link"
import { Music2Icon, PlayIcon } from "lucide-react"

import { cn, formatAssignees } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { getSongs, GetSongsParams } from "../songs/queries"
import { NotResultsFoundView } from "./no-results-found-view"
import { VideosListing } from "./videos-listing"

export async function SongSearchList({
  songsParams,
}: {
  songsParams?: GetSongsParams
}) {
  const songs = await getSongs(songsParams)

  if (!songs?.length) return <NotResultsFoundView query={songsParams?.q} />

  return (
    <div className="space-y-4">
      <div>
        <h2 className="font-semibold">Worship Songs</h2>
        <p className="text-muted-foreground text-sm">
          Showing {songs.length} {songs.length > 1 ? "songs" : "song"}.
        </p>
      </div>

      <div className="flex items-center gap-2">
        <Link
          href="/"
          className={cn(
            buttonVariants({
              variant: "secondary",
            }),
            "bg-muted/60 hover:bg-muted rounded-full",
            !songsParams?.view ? "text-primary" : ""
          )}
        >
          <Music2Icon /> Songs
        </Link>
        <Link
          href="/?view=videos"
          className={cn(
            buttonVariants({
              variant: "secondary",
            }),
            "bg-muted/60 hover:bg-muted rounded-full",
            songsParams?.view === "videos" ? "text-primary" : ""
          )}
        >
          <PlayIcon /> Videos
        </Link>
      </div>
      {songsParams?.view === "videos" ? (
        <VideosListing songs={songs} />
      ) : (
        <ul className="space-y-3">
          {songs.map((song) => (
            <li key={`search-song-${song.id}`}>
              <Link href={`/browse/songs/${song.id}`} prefetch>
                <Card className="bg-muted/60 hover:bg-muted/80 border-none transition-colors">
                  <CardHeader className="items-start">
                    <CardTitle>
                      <h3>{song.title}</h3>
                    </CardTitle>
                    <CardDescription>
                      Listed by {song.createdByName}
                    </CardDescription>
                    <Badge variant="primary" className="normal-case">
                      {song.chordKey === "Original Key"
                        ? song.chordKey
                        : `Key of ${song.chordKey}`}
                    </Badge>
                  </CardHeader>
                  <CardContent>
                    <h3 className="text-sm font-medium">Assignees</h3>
                    <p className="text-muted-foreground text-sm">
                      {formatAssignees(song.assignees)}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
