import { Suspense } from "react"
import { type Metadata } from "next"
import Link from "next/link"
import { CollectionFormDialog } from "@/features/collections/collection-form"
import { CollectionList } from "@/features/collections/collection-list"
import { CollectionListSkeleton } from "@/features/collections/collection-list-skeleton"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export const metadata: Metadata = {
  title: "Collections",
}

function CollectionsPage() {
  return (
    <>
      <Breadcrumb className="mb-6 hidden lg:block">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Collections</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="font-semibold">Collections</h1>
          <p className="text-muted-foreground text-sm">
            Worship songs grouped as collections.
          </p>
        </div>
        <CollectionFormDialog />
      </div>

      <Suspense fallback={<CollectionListSkeleton />}>
        <CollectionList />
      </Suspense>
    </>
  )
}

export default CollectionsPage
