import Link from "next/link"
import type { SongCollection } from "@prisma/client"
import { FolderIcon } from "lucide-react"

import { formatDate } from "@/lib/utils"

import { CollectionItemActions } from "./collection-item-actions"

interface CollectionItemProps {
  collection: SongCollection & {
    _count: {
      songs: number
    }
  }
}

export function CollectionItem({ collection }: CollectionItemProps) {
  return (
    <div className="relative">
      <Link href={`/collections/${collection.id}`} className="group" prefetch>
        <div className="bg-muted/60 hover:bg-muted flex items-center gap-2 rounded-lg px-3 py-2.5 pr-16">
          <div className="bg-primary/20 inline-flex size-8 shrink-0 items-center justify-center rounded-full">
            <FolderIcon className="text-primary size-4" />
          </div>
          <div className="lg:max-w-[60%]">
            <p className="mb-1 line-clamp-1 text-sm font-medium">
              {collection.name}
            </p>
            <p className="text-muted-foreground text-xs capitalize leading-none">
              {collection._count.songs}
              {collection._count.songs > 1 ? " songs" : " song"} &bull;{" "}
              {formatDate(collection.createdAt)} by {collection.createdByName}
            </p>
            <p className="text-muted-foreground text-xs"></p>
          </div>
        </div>
      </Link>

      <CollectionItemActions collection={collection} />
    </div>
  )
}
