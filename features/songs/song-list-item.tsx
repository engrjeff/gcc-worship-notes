import Link from "next/link"
import type { Song, TeamMember } from "@prisma/client"
import { AudioWaveformIcon } from "lucide-react"

import { getInitials } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

import { SongItemActions } from "./song-item-actions"

export function SongListItem({
  song,
}: {
  song: Song & { assignees: TeamMember[] }
}) {
  return (
    <div className="relative">
      <Link href={`/songs/${song.id}`} className="group" prefetch>
        <div className="bg-muted/30 flex flex-col gap-2 rounded-lg border px-3 py-2 pr-16 group-hover:border-gray-600 lg:flex-row lg:items-center lg:gap-4">
          <div className="flex flex-1 items-center gap-2">
            <AudioWaveformIcon className="text-primary size-4" />

            <p className="line-clamp-1 text-sm lg:max-w-[60%]">{song.title}</p>
          </div>

          <div className="flex flex-col items-start gap-2 lg:ml-auto lg:flex-row lg:items-center">
            <Badge variant="chordkey">Key: {song.chordKey}</Badge>

            <div className="flex -space-x-1 overflow-hidden">
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
                    {getInitials(assignee.name)}
                  </AvatarFallback>
                </Avatar>
              ))}
            </div>
          </div>
        </div>
      </Link>

      <SongItemActions song={song} />
    </div>
  )
}
