"use client"

import { useState } from "react"
import { MoreHorizontalIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type RowAction = "view-songs" | "edit" | "delete"

interface Props {
  id: string
  name: string
}

export function TeamMemberRowActions({ id, name }: Props) {
  const [action, setAction] = useState<RowAction>()

  return (
    <>
      <div className="flex items-center justify-center">
        <Button size="sm" variant="link" className="text-blue-500">
          Edit
        </Button>
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-muted/30 size-8 hover:border"
            >
              <span className="sr-only">Actions</span>
              <MoreHorizontalIcon className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setAction("view-songs")}>
              Assigned Songs
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setAction("delete")}
              className="text-red-500 focus:text-red-500"
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  )
}
