import { format } from "date-fns"
import { FolderIcon } from "lucide-react"

import { getRecentCollections } from "../collections/queries"

export async function SuggestedCollections() {
  const collections = await getRecentCollections()

  return (
    <div>
      <h1 className="font-semibold mb-4">Suggested Collections</h1>
      <ul className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {collections.map((collection) => (
          <li key={collection.id}>
            <div className="bg-muted/30 flex items-center gap-4 rounded-lg border px-3 py-2 pr-12 group-hover:border-gray-600">
              <FolderIcon className="size-4 text-primary" />
              <div className="max-w-[70%] flex-1">
                <p className="line-clamp-1 text-sm">{collection.name} </p>
                <p className="text-xs text-muted-foreground">
                  {format(new Date(collection.createdAt), "MMM dd, yyyy")} by{" "}
                  {collection.createdByName}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
