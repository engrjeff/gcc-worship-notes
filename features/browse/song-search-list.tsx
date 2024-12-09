import Link from "next/link"
import { Music2Icon, MusicIcon, PlayIcon } from "lucide-react"

import { cn, formatAssignees } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

import { getSongs, GetSongsParams } from "../songs/queries"
import { NotResultsFoundView } from "./no-results-found-view"
import { SongTags } from "./song-tags"
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
          href={{
            pathname: "/",
            query: {
              collectionId: songsParams?.collectionId ?? undefined,
              q: songsParams?.q ?? undefined,
            },
          }}
          prefetch
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
          href={{
            pathname: "/",
            query: {
              view: "videos",
              collectionId: songsParams?.collectionId ?? undefined,
              q: songsParams?.q ?? undefined,
            },
          }}
          prefetch
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

      <SongTags tagQuery={songsParams?.tag} viewQuery={songsParams?.view} />

      {songsParams?.view === "videos" ? (
        <VideosListing songs={songs} />
      ) : (
        <ul className="space-y-3">
          {songs.map((song) => (
            <li key={`search-song-${song.id}`}>
              <Link href={`/browse/songs/${song.id}`} prefetch>
                <div className="bg-muted/60 hover:bg-muted flex items-center gap-2 rounded-lg px-3 py-2 pr-16">
                  <div className="bg-primary/20 inline-flex size-8 shrink-0 items-center justify-center rounded-full">
                    <MusicIcon className="text-primary size-4" />
                  </div>
                  <div className="lg:max-w-[60%]">
                    <p className="mb-1 line-clamp-1 text-sm font-medium">
                      {song.title}
                    </p>
                    <p className="text-muted-foreground mb-1 text-xs leading-none">
                      {song.chordKey === "Original Key"
                        ? song.chordKey
                        : `Key of ${song.chordKey}`}
                    </p>
                    <p className="text-muted-foreground text-xs">
                      {formatAssignees(song.assignees)}
                    </p>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
