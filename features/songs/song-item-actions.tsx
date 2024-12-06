"use client"

import { useState } from "react"
import Link from "next/link"
import { Song } from "@prisma/client"
import {
  FolderIcon,
  MoreVerticalIcon,
  PencilIcon,
  TrashIcon,
} from "lucide-react"
import { useAction } from "next-safe-action/hooks"
import { toast } from "sonner"

import { useSongCollections } from "@/hooks/use-song-collections"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { addSongsToCollection } from "../collections/actions"
import { SongDeleteDialog } from "./song-delete-dialog"

type RowAction = "edit" | "delete"

export function SongItemActions({ song }: { song: Song }) {
  const [action, setAction] = useState<RowAction>()

  const [open, setOpen] = useState(false)

  const collectionsQuery = useSongCollections()

  const updateAction = useAction(addSongsToCollection, {
    onError: ({ error }) => {
      toast.error(error.serverError ?? "Error")
    },
  })

  async function handleAddSong(collectionId: string, collectionName: string) {
    setOpen(false)

    const result = await updateAction.executeAsync({
      collectionId,
      songIds: [song.id],
    })

    if (result?.data?.collection?.id) {
      toast.success(`${song.title} saved to ${collectionName}`)
    }
  }

  return (
    <>
      <DropdownMenu modal={false} open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-1.5 top-1.5 size-7 lg:top-1/2 lg:-translate-y-1/2"
          >
            <span className="sr-only">Actions</span>
            <MoreVerticalIcon className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem asChild>
            <Link href={`/songs/${song.id}/edit`}>
              <PencilIcon size={16} /> Edit
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger disabled={collectionsQuery.isLoading}>
              <FolderIcon size={16} /> Add to collection
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent className="p-0">
              <Command
                filter={(value, search) => {
                  if (
                    collectionsQuery.data
                      ?.find((i) => i.id === value)
                      ?.name.toLowerCase()
                      .includes(search.toLowerCase())
                  )
                    return 1
                  return 0
                }}
              >
                <CommandInput
                  placeholder="Search collection"
                  autoFocus={true}
                  className="h-9"
                />
                <CommandList>
                  <CommandEmpty>No collection found.</CommandEmpty>
                  <CommandGroup>
                    {collectionsQuery.data?.map((col) => (
                      <CommandItem
                        key={col.id}
                        value={col.id}
                        onSelect={async (value) =>
                          await handleAddSong(value, col.name)
                        }
                      >
                        {col.name}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
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
            setOpen(false)
          }
        }}
      />
    </>
  )
}
