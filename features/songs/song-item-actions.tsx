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

import { cn, formatDate } from "@/lib/utils"
import { useMediaQuery } from "@/hooks/use-media-query"
import { useSongCollections } from "@/hooks/use-song-collections"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerNestedRoot,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
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

  const [nestedOpen, setNestedOpen] = useState(false)

  const isDesktop = useMediaQuery("(min-width: 768px)")

  const collectionsQuery = useSongCollections()

  const updateAction = useAction(addSongsToCollection, {
    onError: ({ error }) => {
      toast.error(error.serverError ?? "Error")
    },
  })

  async function handleAddSong(collectionId: string, collectionName: string) {
    setNestedOpen(false)
    setOpen(false)

    const result = await updateAction.executeAsync({
      collectionId,
      songIds: [song.id],
    })

    if (result?.data?.collection?.id) {
      toast.success(`${song.title} saved to ${collectionName}`)
    }
  }

  if (isDesktop)
    return (
      <>
        <DropdownMenu modal={false} open={open} onOpenChange={setOpen}>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-1.5 top-1.5 rounded-full lg:top-1/2 lg:-translate-y-1/2"
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
              setNestedOpen(false)
            }
          }}
        />
      </>
    )

  return (
    <>
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-1.5 top-1.5 rounded-full lg:top-1/2 lg:-translate-y-1/2"
          >
            <span className="sr-only">Actions</span>
            <MoreVerticalIcon className="size-4" />
          </Button>
        </DrawerTrigger>
        <DrawerContent className="bg-secondary border-none">
          <DrawerHeader className="text-left">
            <DrawerTitle>{song.title}</DrawerTitle>
            <DrawerDescription>
              {formatDate(song.createdAt)} by {song.createdByName}
            </DrawerDescription>
          </DrawerHeader>
          <div className="space-y-1 py-4">
            <Link
              href={`/songs/${song.id}/edit`}
              className={cn(
                buttonVariants({ variant: "ghost", size: "lg" }),
                "hover:bg-muted w-full justify-start rounded-none px-0"
              )}
            >
              <PencilIcon size={16} className="ml-4 mr-5" /> Edit Details
            </Link>

            <DrawerNestedRoot
              modal={false}
              open={nestedOpen}
              onOpenChange={setNestedOpen}
              dismissible={false}
            >
              <DrawerTrigger asChild>
                <Button
                  variant="ghost"
                  size="lg"
                  className="hover:bg-muted w-full justify-start rounded-none px-0"
                  onClick={() => setNestedOpen(true)}
                >
                  <FolderIcon size={16} className="ml-4 mr-5" /> Add to
                  collection
                </Button>
              </DrawerTrigger>
              <DrawerContent className="bg-secondary min-h-[300px] border-none p-6">
                <DrawerHeader className="text-left">
                  <DrawerTitle>Add to Collection</DrawerTitle>
                  <DrawerDescription>Pick a collection.</DrawerDescription>
                </DrawerHeader>
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
                  className="bg-transparent"
                >
                  <CommandInput
                    placeholder="Search collection"
                    className="h-9"
                  />
                  <CommandList className="py-4">
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
                <Button
                  size="lg"
                  variant="plain"
                  className="mt-6"
                  onClick={() => setNestedOpen(false)}
                >
                  Cancel
                </Button>
              </DrawerContent>
            </DrawerNestedRoot>
            <Button
              variant="ghost"
              size="lg"
              className="text-destructive hover:bg-destructive/10 hover:text-destructive w-full justify-start rounded-none px-0"
              onClick={() => {
                setAction("delete")
                setOpen(false)
              }}
            >
              <TrashIcon size={16} className="ml-4 mr-5" />
              Delete
            </Button>
          </div>
        </DrawerContent>
      </Drawer>
      <SongDeleteDialog
        songId={song.id}
        songTitle={song.title}
        open={action === "delete"}
        setOpen={(isOpen) => {
          if (!isOpen) {
            setAction(undefined)
            setOpen(false)
            setNestedOpen(false)
          }
        }}
      />
    </>
  )
}
