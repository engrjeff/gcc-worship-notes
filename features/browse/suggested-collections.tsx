import Link from "next/link"
import { FolderIcon } from "lucide-react"

import { formatDate } from "@/lib/utils"

import { getRecentCollections } from "../collections/queries"

export async function SuggestedCollections() {
  const collections = await getRecentCollections()

  return (
    <div>
      <h2 className="mb-4 font-semibold">Suggested Collections</h2>
      <ul className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {collections.map((collection) => (
          <li key={collection.id}>
            <Link href={`/browse/collections/${collection.id}`} prefetch>
              <div className="bg-muted/30 hover:bg-muted flex items-center gap-4 rounded-lg border px-3 py-2 pr-12 group-hover:border-gray-600">
                <FolderIcon className="text-primary size-4" />
                <div className="max-w-[70%] flex-1">
                  <p className="line-clamp-1 text-sm">{collection.name} </p>
                  <p className="text-muted-foreground text-xs">
                    {formatDate(collection.createdAt)} by{" "}
                    {collection.createdByName}
                  </p>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
