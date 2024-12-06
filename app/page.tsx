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
    <>
      <BrowseHeader />
      <main className="container mx-auto max-w-screen-md space-y-6 px-4 py-6">
        <h1 className="text-center text-xl font-semibold">
          Welcome to GCC Worship Notes
        </h1>

        <SearchField
          className="h-12 rounded-full pe-9 ps-9 lg:h-12"
          placeholder="Search for worship songs..."
        />

        <div className="flex items-center justify-center gap-4 flex-wrap">
          <ChordKeyFilter />
          <AssigneesFilter />
          <ClearBrowseFilters />
        </div>

        <SuggestedCollections
          activeCollectionId={searchParams?.collectionId}
          viewQuery={searchParams?.view}
        />

        <SongSearchList songsParams={searchParams} />
      </main>
    </>
  )
}
