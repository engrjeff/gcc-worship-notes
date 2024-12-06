import { TooltipProvider } from "@/components/ui/tooltip"
import { Header } from "@/components/shared/header"
import { MobileNav } from "@/components/shared/mobile-nav"
import { Sidebar } from "@/components/shared/sidebar"

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <TooltipProvider>
        <Sidebar />
        <main className="lg:pl-sidebar-width pb-12 lg:pb-0">
          <Header />
          <div className="container mx-auto grid h-full max-w-screen-md grid-rows-1 overflow-y-auto p-4 lg:p-6">
            {children}
          </div>
          <MobileNav />
        </main>
      </TooltipProvider>
    </>
  )
}
