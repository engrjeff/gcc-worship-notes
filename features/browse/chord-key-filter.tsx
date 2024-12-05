"use client"

import { HashIcon } from "lucide-react"
import { useQueryState } from "nuqs"

import { chordKeyOptions } from "@/lib/constants"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function ChordKeyFilter() {
  const [chordQuery, setChordQuery] = useQueryState("chord", {
    defaultValue: "",
    shallow: false,
  })

  return (
    <Select
      value={chordQuery}
      onValueChange={(val) => setChordQuery(val === "reset" ? "" : val)}
    >
      <SelectTrigger className="bg-secondary font-medium text-secondary-foreground shadow-sm hover:bg-secondary/80 relative w-[120px] rounded-full border-none ps-9">
        <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 group-has-[[disabled]]:opacity-50">
          <HashIcon size={16} strokeWidth={2} aria-hidden="true" />
        </div>
        <SelectValue placeholder="Key" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Key</SelectLabel>
          <SelectItem value="reset" className="text-muted-foreground">
            Clear
          </SelectItem>
          {chordKeyOptions.map((chordKey) => (
            <SelectItem key={`chordkey-filter-${chordKey}`} value={chordKey}>
              {chordKey}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
