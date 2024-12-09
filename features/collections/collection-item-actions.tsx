"use client"

import { useState } from "react"
import { SongCollection } from "@prisma/client"
import {
  MoreVerticalIcon,
  MusicIcon,
  PencilIcon,
  TrashIcon,
} from "lucide-react"

import { formatDate } from "@/lib/utils"
import { useMediaQuery } from "@/hooks/use-media-query"
import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { CollectionDeleteDialog } from "./collection-delete-dialog"
import { EditCollectionFormDialog } from "./edit-collection-form"

type RowAction = "add-song" | "edit" | "delete"

export function CollectionItemActions({
  collection,
}: {
  collection: SongCollection
}) {
  const [action, setAction] = useState<RowAction>()

  const [open, setOpen] = useState(false)

  const isDesktop = useMediaQuery("(min-width: 768px)")

  if (isDesktop)
    return (
      <>
        <DropdownMenu modal={false} open={open} onOpenChange={setOpen}>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded-full"
            >
              <span className="sr-only">Actions</span>
              <MoreVerticalIcon className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setAction("add-song")} disabled>
              <MusicIcon size={16} /> Add Song (WIP)
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setAction("edit")}>
              <PencilIcon size={16} /> Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setAction("delete")}
              className="text-destructive focus:text-destructive"
            >
              <TrashIcon size={16} /> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <EditCollectionFormDialog
          collection={collection}
          open={action === "edit"}
          setOpen={(isOpen) => {
            if (!isOpen) {
              setAction(undefined)
              setOpen(false)
            }
          }}
        />

        <CollectionDeleteDialog
          collectionId={collection.id}
          collectionName={collection.name}
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
            <DrawerTitle>{collection.name}</DrawerTitle>
            <DrawerDescription>
              {formatDate(collection.createdAt)} by {collection.createdByName}
            </DrawerDescription>
          </DrawerHeader>
          <div className="space-y-1 py-4">
            <Button
              variant="ghost"
              size="lg"
              className="hover:bg-muted w-full justify-start rounded-none px-0"
              disabled
              onClick={() => setAction("add-song")}
            >
              <MusicIcon size={16} className="ml-4 mr-5" /> Add Song (WIP)
            </Button>
            <Button
              variant="ghost"
              size="lg"
              className="hover:bg-muted w-full justify-start rounded-none px-0"
              onClick={() => setAction("edit")}
            >
              <PencilIcon size={16} className="ml-4 mr-5" /> Edit
            </Button>
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
      <EditCollectionFormDialog
        collection={collection}
        open={action === "edit"}
        setOpen={(isOpen) => {
          if (!isOpen) {
            setAction(undefined)
            setOpen(false)
          }
        }}
      />

      <CollectionDeleteDialog
        collectionId={collection.id}
        collectionName={collection.name}
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
