import { AssigneesFilter } from "@/features/browse/assignees-filter"
import { BrowseHeader } from "@/features/browse/browse-header"
import { ChordKeyFilter } from "@/features/browse/chord-key-filter"
import { ClearBrowseFilters } from "@/features/browse/clear-browse-filters"
import { SongSearchList } from "@/features/browse/song-search-list"
import { SuggestedCollections } from "@/features/browse/suggested-collections"
import { GetSongsParams } from "@/features/songs/queries"

import { SearchField } from "@/components/ui/search-field"

interface BrowsePageProps {
  searchParams?: GetSongsParams
}

export default function HomePage({ searchParams }: BrowsePageProps) {
  return (
    <div className="p-4">
      <BrowseHeader />

      <main className="container mx-auto max-w-screen-md space-y-6 py-8">
        <SearchField
          className="h-12 rounded-full pe-9 ps-9 lg:h-12"
          placeholder="Search for worship songs..."
          inputProps={{
            autoFocus: true,
          }}
        />

        <div className="flex items-center justify-center gap-4">
          <ChordKeyFilter />
          <AssigneesFilter />
          <ClearBrowseFilters />
        </div>

        <SuggestedCollections />

        <SongSearchList songsParams={searchParams} />
      </main>
    </div>
  )
}
