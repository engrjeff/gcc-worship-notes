"use client"

import { XIcon } from "lucide-react"
import { parseAsString, useQueryStates } from "nuqs"

import { Button } from "@/components/ui/button"

export function ClearBrowseFilters() {
  const [filters, setFilters] = useQueryStates(
    {
      chord: parseAsString,
      assignee: parseAsString,
    },
    { shallow: false }
  )

  if (Object.values(filters)?.every((f) => !f)) return null

  return (
    <Button
      type="button"
      variant="secondary"
      className="rounded-full"
      onClick={() => setFilters(null)}
    >
      Clear Filters <XIcon className="size-4" aria-hidden="true" />
    </Button>
  )
}
