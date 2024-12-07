import { Suspense } from "react"
import { type Metadata } from "next"
import Link from "next/link"
import { GetSongsParams } from "@/features/songs/queries"
import { SongList } from "@/features/songs/song-list"
import { SongListSkeleton } from "@/features/songs/song-list-skeleton"
import { PlusCircleIcon } from "lucide-react"

import { buttonVariants } from "@/components/ui/button"
import { SearchField } from "@/components/ui/search-field"

export const metadata: Metadata = {
  title: "Songs",
}

function SongsPage({ searchParams }: { searchParams?: GetSongsParams }) {
  return (
    <>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="font-semibold">Songs</h1>
          <p className="text-muted-foreground text-sm">
            View, create, and manage worship song notes.
          </p>
        </div>
        <Link href="/songs/add" className={buttonVariants()} prefetch>
          <PlusCircleIcon /> Add Song
        </Link>
      </div>

      <SearchField
        className="bg-muted/60 mt-4 border-none lg:h-10"
        placeholder="Search songs"
      />

      <Suspense fallback={<SongListSkeleton />}>
        <SongList songParams={searchParams} />
      </Suspense>
    </>
  )
}

export default SongsPage
