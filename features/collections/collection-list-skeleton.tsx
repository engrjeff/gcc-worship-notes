import { Skeleton } from "@/components/ui/skeleton"

export function CollectionListSkeleton() {
  return (
    <ul className="space-y-3 py-6">
      {Array.from(Array(8).keys()).map((n) => (
        <li key={`skeleton-${n + 1}`}>
          <Skeleton className="bg-muted/30 h-[42px]" />
        </li>
      ))}
    </ul>
  )
}