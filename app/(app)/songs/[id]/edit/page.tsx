import { type Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { EditSongForm } from "@/features/songs/edit-song-form"
import { getSongById } from "@/features/songs/queries"
import { ArrowLeftIcon } from "lucide-react"

import { cn, formatDate } from "@/lib/utils"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { buttonVariants } from "@/components/ui/button"

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
      <Breadcrumb className="mb-6 hidden lg:flex">
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
        <Link
          href="/songs"
          className={cn(
            buttonVariants({ variant: "link" }),
            "text-foreground mb-4 grow-0 px-0 lg:hidden"
          )}
        >
          <ArrowLeftIcon className="size-4" />
          Back to List
        </Link>
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
