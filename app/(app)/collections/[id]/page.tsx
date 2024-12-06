import { type Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getCollectionById } from "@/features/collections/queries"
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
          <Badge variant="primary" className="ml-2">
            {collection.songs.length}{" "}
            {collection.songs.length > 1 ? "songs" : "song"}
          </Badge>
        </div>
      </div>

      <Separator className="my-4" />
    </>
  )
}

export default CollectionDetailPage
