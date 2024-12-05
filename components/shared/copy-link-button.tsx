"use client"

import { CircleCheckIcon, LinkIcon } from "lucide-react"
import { toast } from "sonner"

import { Button } from "../ui/button"

export function CopyLinkButton() {
  function handleCopy() {
    if (navigator.clipboard) {
      const location = window.location.toString()

      if (!location) return

      navigator.clipboard.writeText(location)

      toast("Song link copied!", {
        position: "top-right",
        icon: <CircleCheckIcon className="size-4 text-emerald-500" />,
      })
    }
  }

  return (
    <Button onClick={handleCopy} size="sm" variant="secondary">
      <LinkIcon size={16} />
      Copy Link
    </Button>
  )
}
