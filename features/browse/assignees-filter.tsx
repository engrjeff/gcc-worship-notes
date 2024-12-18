"use client"

import { LoaderIcon, UserIcon } from "lucide-react"
import { useQueryState } from "nuqs"

import { useTeamMembers } from "@/hooks/use-team-members"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function AssigneesFilter() {
  const [assigneeQuery, setAssigneeQuery] = useQueryState("assignee", {
    defaultValue: "",
    shallow: false,
  })

  const members = useTeamMembers()

  const assignees = members.data?.filter((d) =>
    d.designation.includes("Vocalist")
  )

  return (
    <Select
      disabled={members.isLoading}
      value={assigneeQuery}
      onValueChange={(val) => setAssigneeQuery(val === "reset" ? "" : val)}
    >
      <SelectTrigger className="bg-muted/60 text-secondary-foreground hover:bg-muted relative w-min rounded-full border-none ps-9 font-medium shadow-sm">
        <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 group-has-[[disabled]]:opacity-50">
          {members.isLoading ? (
            <LoaderIcon
              size={16}
              strokeWidth={2}
              aria-hidden="true"
              className="animate-spin"
            />
          ) : (
            <UserIcon size={16} strokeWidth={2} aria-hidden="true" />
          )}
        </div>
        <SelectValue placeholder="Assignee" />
      </SelectTrigger>
      <SelectContent className="w-trigger-width rounded-lg">
        <SelectGroup>
          <SelectLabel>Assignee</SelectLabel>
          <SelectItem value="reset" className="text-muted-foreground">
            Clear
          </SelectItem>
          {assignees?.map((a) => (
            <SelectItem key={`assignee-filter-${a.id}`} value={a.id}>
              {a.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
