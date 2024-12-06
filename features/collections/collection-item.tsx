import Link from "next/link"
import type { SongCollection } from "@prisma/client"
import { FolderIcon } from "lucide-react"

import { formatDate } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

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
      <Link href={`/collections/${collection.id}`} className="group">
        <div className="bg-muted/30 flex flex-col gap-2 rounded-lg border px-3 py-2 pr-16 group-hover:border-gray-600 lg:flex-row lg:items-center lg:gap-4">
          <div className="flex flex-1 items-center gap-2">
            <FolderIcon className="text-primary size-4" />

            <p className="line-clamp-1 text-sm lg:max-w-[60%]">
              {collection.name}
            </p>
          </div>
          <div className="flex flex-col items-start gap-2 lg:ml-auto lg:flex-row lg:items-center">
            <Badge variant="primary">
              {collection._count.songs}{" "}
              {collection._count.songs > 1 ? "songs" : "song"}
            </Badge>
            <p className="text-muted-foreground text-xs lg:ml-auto">
              {formatDate(collection.createdAt)} by {collection.createdByName}
            </p>
          </div>
        </div>
      </Link>

      <CollectionItemActions collection={collection} />
    </div>
  )
}
