import { Suspense } from "react"
import { type Metadata } from "next"
import Link from "next/link"
import { SongList } from "@/features/songs/song-list"
import { SongListSkeleton } from "@/features/songs/song-list-skeleton"
import { PlusCircleIcon } from "lucide-react"

import { buttonVariants } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Songs",
}

function SongsPage() {
  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-semibold">Songs</h1>
          <p className="text-muted-foreground text-sm">
            View, create, and manage worship song notes.
          </p>
        </div>
        <Link href="/songs/add" className={buttonVariants({ size: "sm" })}>
          <PlusCircleIcon /> Add Song
        </Link>
      </div>

      <Suspense fallback={<SongListSkeleton />}>
        <SongList />
      </Suspense>
    </>
  )
}

export default SongsPage
