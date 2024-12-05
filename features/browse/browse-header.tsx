import Link from "next/link"
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
import { AudioWaveformIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

export function BrowseHeader() {
  return (
    <header className="container mx-auto flex max-w-screen-md items-center justify-between">
      <span className="flex items-center gap-2 font-bold">
        <AudioWaveformIcon className="text-primary size-6" /> GCC Worship Notes
      </span>
      <SignedIn>
        <div className="ml-auto flex items-center gap-4">
          <Link
            href="/songs"
            className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}
          >
            Dashboard
          </Link>
          <UserButton />
        </div>
      </SignedIn>
      <SignedOut>
        <div className="ml-auto flex items-center gap-4">
          <Link href="/sign-in" className={cn(buttonVariants())}>
            Sign In
          </Link>
        </div>
      </SignedOut>
    </header>
  )
}
