import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { getTeamMembers } from "./queries"
import { TeamMemberIcon } from "./team-member-icon"
import { TeamMemberRowActions } from "./team-member-row-actions"

export async function TeamMembersList() {
  const members = await getTeamMembers()

  return (
    <Table containerClass="border rounded-lg flex-none my-6">
      <TableHeader>
        <TableRow className="bg-muted/30">
          <TableHead className="w-9"></TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Designation</TableHead>
          <TableHead className="text-center">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {members.map((member) => (
          <TableRow key={`member-row-${member.id}`}>
            <TableCell className="text-center">
              <TeamMemberIcon designation={member.designation} />
            </TableCell>
            <TableCell className="whitespace-nowrap">{member.name}</TableCell>
            <TableCell className="whitespace-nowrap">
              {member.designation}
            </TableCell>
            <TableCell className="text-center">
              <TeamMemberRowActions id={member.id} name={member.name} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
