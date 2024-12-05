import { CollectionItem } from "./collection-item"
import { getSongCollections } from "./queries"

export async function CollectionList() {
  const collections = await getSongCollections()

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
