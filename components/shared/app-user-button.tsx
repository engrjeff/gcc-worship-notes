"use client"

import { SignedIn, UserButton, useUser } from "@clerk/nextjs"

export function AppUserButton() {
  const { user } = useUser()

  return (
    <SignedIn>
      <div className="flex items-center gap-2">
        <UserButton />
        <div className="">
          <p className="text-sm font-medium">{user?.fullName}</p>
          <p className="text-muted-foreground text-xs">
            {user?.emailAddresses.at(0)?.emailAddress}
          </p>
        </div>
      </div>
    </SignedIn>
  )
}
