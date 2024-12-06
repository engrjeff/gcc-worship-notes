import { type ReactNode } from "react"
import { BrowseHeader } from "@/features/browse/browse-header"

function BrowseResultsLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <BrowseHeader />
      <main className="container mx-auto max-w-screen-md space-y-6 px-4 py-6">
        {children}
      </main>
    </>
  )
}

export default BrowseResultsLayout
