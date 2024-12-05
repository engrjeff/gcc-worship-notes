"use client"

import { useState } from "react"
import Link from "next/link"
import { Song } from "@prisma/client"
import { MoreHorizontalIcon, PencilIcon, TrashIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { SongDeleteDialog } from "./song-delete-dialog"

type RowAction = "edit" | "delete"

export function SongItemActions({ song }: { song: Song }) {
  const [action, setAction] = useState<RowAction>()

  return (
    <>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-1.5 top-1/2 size-7 -translate-y-1/2"
          >
            <span className="sr-only">Actions</span>
            <MoreHorizontalIcon className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem asChild>
            <Link href={`/songs/${song.id}/edit`}>
              <PencilIcon size={16} /> Edit
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setAction("delete")}
            className="text-destructive focus:text-destructive"
          >
            <TrashIcon size={16} /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <SongDeleteDialog
        songId={song.id}
        songTitle={song.title}
        open={action === "delete"}
        setOpen={(isOpen) => {
          if (!isOpen) {
            setAction(undefined)
          }
        }}
      />
    </>
  )
}
