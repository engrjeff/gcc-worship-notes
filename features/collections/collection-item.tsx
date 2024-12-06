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
        <div className="bg-muted/30 flex items-center gap-4 rounded-lg border px-3 py-2 pr-12 group-hover:border-gray-600">
          <FolderIcon className="text-primary size-4" />
          <div className="max-w-[70%] flex-1">
            <div className="flex items-center">
              <p className="line-clamp-1 text-sm">{collection.name} </p>
              <Badge variant="primary" className="ml-2">
                {collection._count.songs}{" "}
                {collection._count.songs > 1 ? "songs" : "song"}
              </Badge>
            </div>
            <p className="text-muted-foreground text-xs">
              Created at {formatDate(collection.createdAt)}
              {}
            </p>
          </div>

          <p className="text-muted-foreground ml-auto text-xs">
            By {collection.createdByName}
          </p>
        </div>
      </Link>

      <CollectionItemActions collection={collection} />
    </div>
  )
}
