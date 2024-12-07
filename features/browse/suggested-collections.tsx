import Link from "next/link"
import { SongCollection } from "@prisma/client"
import { FolderIcon } from "lucide-react"

import { cn, formatDate } from "@/lib/utils"

import { getRecentCollections } from "../collections/queries"

export async function SuggestedCollections({
  activeCollectionId,
  viewQuery,
}: {
  activeCollectionId?: string
  viewQuery?: string
}) {
  const collections = await getRecentCollections()

  const activeColl = collections.find((c) => c.id === activeCollectionId)

  return (
    <div className="space-y-4">
      <div>
        <h2 className="font-semibold">Suggested Collections</h2>
        {activeCollectionId && activeColl ? (
          <p className="text-muted-foreground text-sm">
            Showing songs under{" "}
            <span className="text-foreground font-semibold">
              {activeColl?.name}
            </span>
          </p>
        ) : null}
      </div>
      <ul className="grid grid-cols-1 gap-3 lg:grid-cols-2 lg:gap-4">
        {collections.map((collection) => (
          <li key={collection.id}>
            <CollectionItem
              collection={collection}
              isActive={activeCollectionId === collection.id}
              viewQuery={viewQuery}
            />
          </li>
        ))}
      </ul>
    </div>
  )
}

function CollectionItem({
  collection,
  isActive,
  viewQuery,
}: {
  collection: SongCollection
  isActive: boolean
  viewQuery?: string
}) {
  return (
    <Link
      href={{
        pathname: "/",
        query: {
          view: viewQuery,
          collectionId: isActive ? undefined : collection.id,
        },
      }}
      prefetch
    >
      <div
        className={cn(
          "bg-muted/60 hover:bg-muted/80 flex items-center gap-4 rounded-lg px-3 py-2 pr-12 group-hover:border-gray-600",
          {
            "ring-2 ring-primary": isActive,
          }
        )}
      >
        <div className="bg-primary/20 inline-flex size-8 shrink-0 items-center justify-center rounded-full">
          <FolderIcon className="text-primary size-4" />
        </div>
        <div className="max-w-[70%] flex-1">
          <p className="line-clamp-1 text-sm">{collection.name} </p>
          <p className="text-muted-foreground text-xs capitalize">
            {formatDate(collection.createdAt)} by {collection.createdByName}
          </p>
        </div>
      </div>
    </Link>
  )
}
