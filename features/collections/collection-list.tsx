import { CollectionItem } from "./collection-item"
import { getSongCollections } from "./queries"

export async function CollectionList() {
  const collections = await getSongCollections()

  if (!collections.length)
    return (
      <div className="mt-4 flex h-[300px] flex-col items-center justify-center border border-dashed p-4">
        <p className="text-muted-foreground text-center">
          No collections created yet. Add one now.
        </p>
      </div>
    )

  return (
    <ul className="space-y-3 py-6">
      {collections.map((collection) => (
        <li key={collection.id}>
          <CollectionItem collection={collection} />
        </li>
      ))}
    </ul>
  )
}
