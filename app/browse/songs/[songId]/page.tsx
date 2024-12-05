import Link from "next/link"
import { NotFoundSongView } from "@/features/browse/not-found-song-view"
import { getSongById } from "@/features/songs/queries"
import { SongLyrics } from "@/features/songs/song-lyrics"
import { SongSourceLinks } from "@/features/songs/song-source-links"
import { YouTubeLinksPreviews } from "@/features/songs/youtube-links-preview"
import { format } from "date-fns"
import { ArrowLeftIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CopyLinkButton } from "@/components/shared/copy-link-button"

async function BrowseSongDetailPage({
  params,
}: {
  params: { songId: string }
}) {
  const song = await getSongById(params.songId)

  if (!song) return <NotFoundSongView />

  return (
    <>
      <Link
        href="/"
        className={cn(
          buttonVariants({ variant: "link" }),
          "text-foreground px-0"
        )}
      >
        <ArrowLeftIcon className="size-4" />
        Back to List
      </Link>
      <div className="flex flex-col lg:flex-row lg:items-center gap-6 lg:justify-between">
        <div>
          <h1 className="text-lg font-semibold line-clamp-1">{song.title} </h1>
          <p className="text-muted-foreground mb-4 text-sm">
            Listed on {format(new Date(song.createdAt), "MMM dd, yyyy")} by{" "}
            {song.createdByName}
          </p>
          <Badge variant="primary">Key of {song.chordKey}</Badge>
        </div>
        <div className="lg:ml-auto space-x-3">
          <CopyLinkButton />
        </div>
      </div>
      <Separator className="my-4" />

      <div className="relative">
        <Tabs defaultValue="lyrics">
          <TabsList className="grid w-1/2 grid-cols-2">
            <TabsTrigger value="lyrics">Lyrics</TabsTrigger>
            <TabsTrigger value="sources">Sources</TabsTrigger>
          </TabsList>
          <TabsContent value="lyrics" className="py-4">
            <SongLyrics lyrics={song.lyrics} />
          </TabsContent>
          <TabsContent value="sources" className="py-4">
            <SongSourceLinks sources={song.sources} />

            <div className="mt-6">
              <YouTubeLinksPreviews urls={song.sources} className="space-y-4" />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </>
  )
}

export default BrowseSongDetailPage
