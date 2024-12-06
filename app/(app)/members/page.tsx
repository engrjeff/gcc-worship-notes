import { type Metadata } from "next"
import Link from "next/link"
import { TeamMembersList } from "@/features/team-members/team-members-list"
import { UserPlusIcon } from "lucide-react"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Team",
}

function TeamMembersPage() {
  return (
    <>
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Team Members</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-semibold">GCC Worship Team Members</h1>
          <p className="text-muted-foreground text-sm">
            View, add, and manage Worship Team members.
          </p>
        </div>
        <Button size="sm">
          <UserPlusIcon /> Add Member
        </Button>
      </div>

      <TeamMembersList />
    </>
  )
}

export default TeamMembersPage
