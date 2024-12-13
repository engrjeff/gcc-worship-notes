"use client"

import { ArrowDownIcon, ArrowUpIcon } from "lucide-react"
import { parseAsString, useQueryStates } from "nuqs"

export function CollectionSort() {
  const [sortValue, setSortValue] = useQueryStates(
    {
      sort: parseAsString.withDefault(""),
      order: parseAsString.withDefault(""),
    },
    { shallow: false }
  )

  return (
    <div className="flex items-center gap-3">
      {sortValue.order === "asc" ? (
        <ArrowUpIcon className="size-4" />
      ) : (
        <ArrowDownIcon className="size-4" />
      )}
      <select
        className="placeholder:text-muted-foreground focus:ring-ring focus-visible:border-ring -ml-3 flex h-10 appearance-none items-center justify-between rounded-md border border-none bg-transparent px-3 py-2 text-sm font-medium capitalize focus:outline-none focus:ring-0 disabled:cursor-not-allowed disabled:opacity-50"
        aria-label="sort collections"
        name="sort"
        id="collection-sort"
        value={`${sortValue.sort}-${sortValue.order}`}
        onChange={(e) => {
          const value = e.currentTarget.value

          if (!value) return

          setSortValue({
            sort: value.split("-")[0],
            order: value.split("-")[1],
          })
        }}
      >
        <option value="name-asc">Name A-Z</option>
        <option value="name-desc">Name Z-A</option>
        <option value="createdAt-asc">Oldest</option>
        <option value="createdAt-desc">Newest</option>
        <option value="updatedAt-asc">Last modified</option>
      </select>
    </div>
  )
}
