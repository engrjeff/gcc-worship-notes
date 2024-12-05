"use client"

import { CircleCheckIcon, CopyIcon } from "lucide-react"
import { toast } from "sonner"

import { Button } from "../ui/button"

interface CopyButtonProps {
  lyrics: string
}

export function CopyLyricsButton({ lyrics }: CopyButtonProps) {
  function handleCopy() {
    if (navigator.clipboard) {
      if (lyrics) {
        const target = document.getElementById("gcc-song-lyrics")

        if (!target) return

        const range = document.createRange()

        range.selectNode(target)

        if (window.getSelection) {
          window.getSelection()?.removeAllRanges()
          window.getSelection()?.addRange(range)

          const toCopy = window.getSelection()?.toString()

          if (!toCopy) return

          navigator.clipboard.writeText(toCopy)

          toast("Lyrics copied!", {
            position: "top-right",
            icon: <CircleCheckIcon className="size-4 text-emerald-500" />,
            onAutoClose(toast) {
              window.getSelection()?.empty()
            },
          })
        }
      }
    }
  }

  return (
    <Button onClick={handleCopy} size="sm" variant="secondary">
      <CopyIcon size={16} />
      Copy Lyrics
    </Button>
  )
}
