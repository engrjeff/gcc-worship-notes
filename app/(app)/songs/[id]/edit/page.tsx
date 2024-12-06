import { type Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { EditSongForm } from "@/features/songs/edit-song-form"
import { getSongById } from "@/features/songs/queries"

import { formatDate } from "@/lib/utils"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export async function generateMetadata({
  params,
}: {
  params: { id: string }
}): Promise<Metadata> {
  const song = await getSongById(params.id)

  return {
    title: `Edit ${song?.title}`,
  }
}

async function EditSongPage({ params }: { params: { id: string } }) {
  const song = await getSongById(params.id)

  if (!song) return notFound()

  return (
    <>
      <Breadcrumb className="mb-4">
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
      <div>
        <h1 className="font-semibold">Update {song.title}</h1>
        <p className="text-muted-foreground text-sm">
          Last updated {formatDate(song.updatedAt)}
        </p>
      </div>

      <EditSongForm song={song} />
    </>
  )
}

export default EditSongPage
