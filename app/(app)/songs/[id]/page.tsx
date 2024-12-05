import { type Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getSongById } from "@/features/songs/queries"
import { SongLyrics } from "@/features/songs/song-lyrics"
import { SongSourceLinks } from "@/features/songs/song-source-links"
import { YouTubeLinksPreviews } from "@/features/songs/youtube-links-preview"
import { format } from "date-fns"
import { EditIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { buttonVariants } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export async function generateMetadata({
  params,
}: {
  params: { id: string }
}): Promise<Metadata> {
  const song = await getSongById(params.id)

  return {
    title: song?.title,
  }
}

async function SongDetailPage({ params }: { params: { id: string } }) {
  const song = await getSongById(params.id)

  if (!song) return notFound()

  return (
    <>
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/songs">Songs</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{song.title}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex items-start">
        <div>
          <h1 className="text-lg font-semibold">
            {song.title}{" "}
            <Badge variant="chordkey" className="ml-2">
              Key of {song.chordKey}
            </Badge>
          </h1>
          <p className="text-muted-foreground mb-6 text-sm">
            Listed on {format(new Date(song.createdAt), "MMM dd, yyyy")} by{" "}
            {song.createdByName}
          </p>
        </div>

        <Link
          href={`/songs/${song.id}/edit`}
          className={cn(
            buttonVariants({ size: "icon", variant: "secondary" }),
            "size-7 ml-auto"
          )}
        >
          <span className="sr-only">Edit</span>
          <EditIcon />
        </Link>
      </div>
      <h2 className="mb-3 font-semibold">Assignees</h2>
      <ul className="gap-3 flex items-center">
        {song.assignees.map((assignee) => (
          <li key={assignee.id}>
            <div className="flex items-center gap-2">
              <Avatar className="ring-background inline-block size-6 ring-2">
                <AvatarImage
                  src={assignee.imageUrl!}
                  alt=""
                  className="object-contain"
                />
                <AvatarFallback className="text-xs">
                  {assignee.name
                    .split(" ")
                    .map((s) => s.substring(0, 1))
                    .join("")}
                </AvatarFallback>
              </Avatar>

              <p className="text-sm">{assignee.name}</p>
            </div>
          </li>
        ))}
      </ul>
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

export default SongDetailPage