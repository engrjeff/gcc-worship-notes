import Link from "next/link"
import { SignedIn, UserButton } from "@clerk/nextjs"
import { AudioWaveformIcon } from "lucide-react"

export function Header() {
  return (
    <header className="bg-background/70 container sticky top-0 z-10 mx-auto flex h-14 max-w-screen-md items-center justify-between border-b px-4 backdrop-blur-lg lg:hidden lg:border-none">
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
        <UserButton />
      </SignedIn>
    </header>
  )
}
