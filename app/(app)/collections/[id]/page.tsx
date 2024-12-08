import { type Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getCollectionById } from "@/features/collections/queries"
import { SongListItem } from "@/features/songs/song-list-item"
import { ArrowLeftIcon } from "lucide-react"

import { cn, formatDate } from "@/lib/utils"
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

export async function generateMetadata({
  params,
}: {
  params: { id: string }
}): Promise<Metadata> {
  const collection = await getCollectionById(params.id)

  return {
    title: collection?.name,
  }
}

async function CollectionDetailPage({ params }: { params: { id: string } }) {
  const collection = await getCollectionById(params.id)

  if (!collection) return notFound()

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
              <Link href="/collections">Collections</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{collection.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="mb-4">
        <Link
          href="/collections"
          className={cn(
            buttonVariants({ variant: "link" }),
            "text-foreground grow-0 px-0 lg:hidden"
          )}
        >
          <ArrowLeftIcon className="size-4" />
          Back to List
        </Link>
      </div>
      <div className="flex items-start">
        <div className="mb-4">
          <h1 className="font-semibold lg:text-lg">{collection.name} </h1>
          <p className="text-muted-foreground mb-2 text-sm">
            Listed {formatDate(collection.createdAt)} by{" "}
            {collection.createdByName}
          </p>
          <Badge variant="primary">
            {collection.songs.length}{" "}
            {collection.songs.length > 1 ? "songs" : "song"}
          </Badge>
        </div>
      </div>

      <Separator className="my-4" />

      <div className="space-y-2">
        <h2 className="font-semibold">Songs</h2>

        {!collection.songs?.length ? (
          <div className="mt-4 flex h-[300px] flex-col items-center justify-center rounded-lg border border-dashed p-4">
            <p className="text-muted-foreground text-center">
              No songs listed yet. Add one now.
            </p>
          </div>
        ) : (
          <ul className="space-y-3 py-4 pb-6">
            {collection.songs.map((song) => (
              <li key={song.id}>
                <SongListItem song={song} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  )
}

export default CollectionDetailPage
