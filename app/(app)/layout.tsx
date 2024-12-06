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
        <main className="lg:pl-sidebar-width">
          <Header />
          <div className="container mx-auto h-full max-w-screen-md overflow-y-auto p-4 pb-20 lg:p-6">
            {children}
          </div>
          <MobileNav />
        </main>
      </TooltipProvider>
    </>
  )
}
