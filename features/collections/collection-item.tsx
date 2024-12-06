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
        <div className="bg-muted/30 flex flex-col gap-2 rounded-lg border px-3 py-2 pr-12 group-hover:border-gray-600 lg:flex-row lg:items-center lg:gap-4">
          <div className="flex max-w-[80%] flex-1 items-start lg:max-w-[70%]">
            <FolderIcon className="text-primary size-4" />
            <div className="flex items-center">
              <p className="line-clamp-1 text-sm">{collection.name} </p>
              <Badge variant="primary" className="ml-2">
                {collection._count.songs}{" "}
                {collection._count.songs > 1 ? "songs" : "song"}
              </Badge>
            </div>
          </div>

          <p className="text-muted-foreground text-xs lg:ml-auto">
            {formatDate(collection.createdAt)} by {collection.createdByName}
          </p>
        </div>
      </Link>

      <CollectionItemActions collection={collection} />
    </div>
  )
}
