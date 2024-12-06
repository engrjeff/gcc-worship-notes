import { SignedIn, UserButton } from "@clerk/nextjs"
import { AudioWaveformIcon, MenuIcon } from "lucide-react"

import { Button } from "../ui/button"
import { SearchField } from "../ui/search-field"

export function Header() {
  return (
    <header className="h-16 p-3 lg:hidden">
      <div className="bg-muted container mx-auto flex h-full max-w-screen-md items-center justify-between gap-2 rounded-full px-2">
        <Button
          type="button"
          size="icon"
          variant="ghost"
          className="size-7 shrink-0 rounded-full"
        >
          <MenuIcon size={16} />
        </Button>
        <span className="hidden items-center gap-2 font-bold">
          <AudioWaveformIcon className="text-primary size-6" /> GCC Worship
          Notes
        </span>
        <SearchField
          hideIcon
          className="bg-muted border-muted w-full rounded-full focus-visible:ring-transparent"
        />
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </header>
  )
}
