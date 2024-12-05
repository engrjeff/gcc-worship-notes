import Link from "next/link"
import { ArrowLeftIcon } from "lucide-react"

import { buttonVariants } from "@/components/ui/button"

export function NotFoundSongView() {
  return (
    <div className="text-center">
      <p className="text-primary text-base font-semibold">Ooops</p>
      <h1 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-white sm:text-3xl">
        Song not found
      </h1>
      <p className="mt-6 text-pretty text-gray-500">
        Sorry, we couldn’t find this song. Try searching for other songs.
      </p>

      <div className="mt-10 flex items-center justify-center gap-x-6">
        <Link href="/" className={buttonVariants({ variant: "secondary" })}>
          <ArrowLeftIcon size={16} /> Back to List
        </Link>
      </div>
    </div>
  )
}
