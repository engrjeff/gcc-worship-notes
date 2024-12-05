"use client"

import { useState } from "react"
import Link from "next/link"
import { SongCollection } from "@prisma/client"
import {
  MoreVerticalIcon,
  MusicIcon,
  PencilIcon,
  TrashIcon,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type RowAction = "add-song" | "edit" | "delete"

export function CollectionItemActions({
  collection,
}: {
  collection: SongCollection
}) {
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
            <MoreVerticalIcon className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setAction("add-song")}>
            <MusicIcon size={16} /> Add Song
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href={`/collections/${collection.id}/edit`}>
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
    </>
  )
}
