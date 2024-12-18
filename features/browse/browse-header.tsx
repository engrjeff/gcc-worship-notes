import Link from "next/link"
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
import { AudioWaveformIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

export function BrowseHeader() {
  return (
    <header className="bg-background/70 container fixed left-1/2 top-0 z-10 mx-auto flex h-14 max-w-screen-md -translate-x-1/2 items-center justify-between border-b px-4 backdrop-blur-lg lg:border-none">
      <Link href="/" prefetch>
        <span className="hidden items-center gap-2 font-bold lg:flex">
          <AudioWaveformIcon className="text-primary size-6" /> GCC Worship
          Notes
        </span>
        <span className="flex items-center gap-2 text-sm font-bold lg:hidden">
          <AudioWaveformIcon className="text-primary size-4" /> GCC WN
        </span>
      </Link>
      <SignedIn>
        <div className="ml-auto flex items-center gap-4">
          <Link
            href="/songs"
            className={cn(
              buttonVariants({ size: "sm", variant: "secondary" }),
              "rounded-full border"
            )}
            prefetch
          >
            Dashboard
          </Link>
          <UserButton />
        </div>
      </SignedIn>
      <SignedOut>
        <div className="ml-auto flex items-center gap-4">
          <a
            href="mailto:jeffsegoviadev@gmail.com?subject=Request Access to GCC Worship Notes&body=Hi Jeff, please grant me access to GCC Worship notes."
            className={cn(
              buttonVariants({ size: "sm", variant: "secondary" }),
              "rounded-full border"
            )}
          >
            Request Access
          </a>

          <Link
            href="/sign-in"
            className={cn(buttonVariants({ size: "sm" }), "rounded-full")}
          >
            Sign In
          </Link>
        </div>
      </SignedOut>
    </header>
  )
}
