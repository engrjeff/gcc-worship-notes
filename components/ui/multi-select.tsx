"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface MultiSelectProps {
  entityName?: string
  selectedIds: string[]
  onChange: (selectedIds: string[]) => void
  options: Array<{ value: string; label: string }>
}

export function MultiSelect({
  selectedIds,
  onChange,
  options,
  entityName = "Select from options",
}: MultiSelectProps) {
  const [open, setOpen] = React.useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          disabled={false}
          aria-expanded={open}
          className="active:ring-ring group h-auto min-h-10 w-full justify-between px-2 active:ring-1"
        >
          {selectedIds.length > 0 ? (
            <span className="flex flex-wrap items-center gap-2">
              {options
                .filter((item) => selectedIds.includes(item.value))
                .map((selected) => selected.label)
                .map((label, idx) => (
                  <span
                    key={`value-${idx}`}
                    className="rounded-sm border border-emerald-400/20 bg-emerald-400/10 px-1.5 py-px text-xs text-emerald-400"
                  >
                    {label}
                  </span>
                ))}
            </span>
          ) : (
            <span>Select {entityName}</span>
          )}
          <ChevronsUpDown className="ml-auto size-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-popover-trigger-width p-0">
        <Command
          filter={(value, search) => {
            if (
              options
                ?.find((i) => i.value === value)
                ?.label.toLowerCase()
                .includes(search.toLowerCase())
            )
              return 1
            return 0
          }}
        >
          <CommandInput placeholder={`Search ${entityName}`} />
          <CommandList>
            <CommandEmpty>No options found.</CommandEmpty>
            <CommandGroup>
              {options?.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={(currentValue) => {
                    if (selectedIds.includes(currentValue)) {
                      onChange(selectedIds.filter((s) => s !== currentValue))
                      return
                    }
                    onChange([...selectedIds, currentValue])
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 size-4 text-emerald-500",
                      selectedIds.includes(option.value)
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>

            <div className="ml-8 mt-4 hidden p-2">
              <Button type="button" size="sm" onClick={() => setOpen(false)}>
                Done
              </Button>
            </div>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
