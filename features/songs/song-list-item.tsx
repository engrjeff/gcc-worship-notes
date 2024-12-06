import Link from "next/link"
import type { Song, TeamMember } from "@prisma/client"
import { MusicIcon } from "lucide-react"

import { formatAssignees } from "@/lib/utils"

import { SongItemActions } from "./song-item-actions"

export function SongListItem({
  song,
}: {
  song: Song & { assignees: TeamMember[] }
}) {
  return (
    <div className="relative">
      <Link href={`/songs/${song.id}`} className="group" prefetch>
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

      <SongItemActions song={song} />
    </div>
  )
}
