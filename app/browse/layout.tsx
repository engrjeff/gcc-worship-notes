import { type ReactNode } from "react"
import { BrowseHeader } from "@/features/browse/browse-header"

function BrowseResultsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="p-4">
      <BrowseHeader />
      <main className="container mx-auto max-w-screen-md space-y-6 py-8">
        {children}
      </main>
    </div>
  )
}

export default BrowseResultsLayout
