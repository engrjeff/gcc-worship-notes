"use client";

import { MultiSelect } from "@/components/ui/multi-select";
import { useTeamMembers } from "@/hooks/use-team-members";
import * as React from "react";

export function AssigneeSelect({
  onValueChange,
  ...props
}: Omit<React.ComponentProps<typeof MultiSelect>, "options" | "onChange"> & {
  onValueChange: (val: { id: string }[]) => void;
}) {
  const teamMembers = useTeamMembers();

  const assignees = teamMembers.data
    ?.filter((m) => m.designation.includes("Vocalist"))
    ?.map((d) => ({ value: d.id, label: d.name }));

  return (
    <MultiSelect
      entityName="assignees"
      {...props}
      options={assignees ?? []}
      onChange={(selectedIds) => {
        const data =
          assignees
            ?.filter((s) => selectedIds.includes(s.value))
            .map((a) => ({ id: a.value })) ?? [];

        onValueChange(data);
      }}
    />
  );
}
