import Link from "next/link"
import type { Song, TeamMember } from "@prisma/client"
import { AudioWaveformIcon } from "lucide-react"

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
      <Link href={`/songs/${song.id}`} className="group">
        <div className="bg-muted/30 flex items-center gap-4 rounded-lg border px-3 py-2 pr-16 group-hover:border-gray-600">
          <AudioWaveformIcon className="size-4 text-primary" />

          <p className="line-clamp-1 max-w-[60%] flex-1 text-sm">
            {song.title}
          </p>

          <Badge variant="chordkey">Key: {song.chordKey}</Badge>

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
        </div>
      </Link>

      <SongItemActions song={song} />
    </div>
  )
}
