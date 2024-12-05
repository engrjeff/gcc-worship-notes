'use client';

import { Check, ChevronsUpDown } from 'lucide-react';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';

interface MultiSelectProps {
  entityName?: string;
  selectedIds: string[];
  onChange: (selectedIds: string[]) => void;
  options: Array<{ value: string; label: string }>;
}

export function MultiSelect({
  selectedIds,
  onChange,
  options,
  entityName = 'Select from options',
}: MultiSelectProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          disabled={false}
          aria-expanded={open}
          className="justify-between w-full group active:ring-1 active:ring-ring"
        >
          {selectedIds.length > 0 ? (
            <span className="flex items-center flex-wrap gap-2">
              {options
                .filter((item) => selectedIds.includes(item.value))
                .map((selected) => selected.label)
                .map((label, idx) => (
                  <span
                    key={`value-${idx}`}
                    className="text-xs px-1.5 py-px rounded-sm border bg-emerald-400/10 border-emerald-400/20 text-emerald-400"
                  >
                    {label}
                  </span>
                ))}
            </span>
          ) : (
            <span>Select {entityName}</span>
          )}
          <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
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
              return 1;
            return 0;
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
                      onChange(selectedIds.filter((s) => s !== currentValue));
                      return;
                    }
                    onChange([...selectedIds, currentValue]);
                  }}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4 text-emerald-500',
                      selectedIds.includes(option.value)
                        ? 'opacity-100'
                        : 'opacity-0'
                    )}
                  />
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>

            <div className="p-2 ml-8 mt-4 hidden">
              <Button type="button" size="sm" onClick={() => setOpen(false)}>
                Done
              </Button>
            </div>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
