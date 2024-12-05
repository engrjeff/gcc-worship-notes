import type { Metadata } from "next"
import localFont from "next/font/local"
import NextTopLoader from "nextjs-toploader"
import { NuqsAdapter } from "nuqs/adapters/next/app"

import { ReactQueryProvider } from "@/components/providers/react-query-provider"
import { ThemeProvider } from "@/components/providers/theme"

import "./globals.css"

import { ClerkProvider } from "@clerk/nextjs"

import { Toaster } from "@/components/ui/sonner"

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
})
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
})

export const metadata: Metadata = {
  title: {
    template: "%s | GCC Worship Notes",
    default: "GCC Worship Notes",
  },
  description:
    "Worship notes management and browsing tool for Grace City Church Worship Team",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning className="h-full">
        <body
          className={`${geistSans.variable} ${geistMono.variable} h-full font-sans antialiased`}
        >
          <NextTopLoader color="#ea580c" />
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <NuqsAdapter>
              <ReactQueryProvider>
                {children}
                <Toaster richColors />
              </ReactQueryProvider>
            </NuqsAdapter>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
