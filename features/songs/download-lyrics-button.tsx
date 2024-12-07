"use client"

import { CircleCheckIcon, DownloadIcon } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function DownloadLyricsButton({ songTitle }: { songTitle: string }) {
  function handleDownloadAsTxt() {
    try {
      const target = document.getElementById("gcc-song-lyrics")

      if (!target) return

      const range = document.createRange()

      range.selectNode(target)

      if (window.getSelection) {
        window.getSelection()?.removeAllRanges()
        window.getSelection()?.addRange(range)

        const toDownload = window.getSelection()?.toString()

        if (!toDownload) return

        // Create a Blob from the content
        const blob = new Blob([toDownload], {
          type: "text/plain",
        })

        // Create a temporary download link
        const downloadLink = document.createElement("a")
        downloadLink.href = URL.createObjectURL(blob)
        downloadLink.download = `${songTitle}.txt` // Name of the file

        // Append the link, trigger the click, and remove the link
        document.body.appendChild(downloadLink)
        downloadLink.click()
        document.body.removeChild(downloadLink)

        toast("File downloaded!", {
          position: "bottom-center",
          icon: <CircleCheckIcon className="size-4 text-emerald-500" />,
          onAutoClose() {
            window.getSelection()?.empty()
          },
        })
      }
    } catch (error) {
      console.error(`GCCWN - Download as TXT file: `, error)
    }
  }

  async function handleDownloadAsPDF() {
    try {
      const target = document.getElementById("gcc-song-lyrics")

      if (!target) return

      const range = document.createRange()

      range.selectNode(target)

      if (window.getSelection) {
        window.getSelection()?.removeAllRanges()
        window.getSelection()?.addRange(range)

        const toDownload = window.getSelection()?.toString()

        if (!toDownload) return

        const jsPDF = (await import("jspdf")).jsPDF

        const doc = new jsPDF()

        doc.text(toDownload, 10, 10)
        doc.save(`${songTitle}.pdf`)

        toast("File downloaded!", {
          position: "bottom-center",
          icon: <CircleCheckIcon className="size-4 text-emerald-500" />,
          onAutoClose() {
            window.getSelection()?.empty()
          },
        })
      }
    } catch (error) {
      console.error(`GCCWN - Download as PDF file: `, error)
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="sm" variant="secondary">
          <DownloadIcon size={16} /> Download
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-secondary border-muted">
        <DropdownMenuLabel>File type</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleDownloadAsTxt}>
          TXT File
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleDownloadAsPDF}>PDF</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
