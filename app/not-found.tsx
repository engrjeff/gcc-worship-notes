import Link from "next/link"

function NotFoundPage() {
  return (
    <main className="grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="text-primary text-base font-semibold">404</p>
        <h1 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-white sm:text-5xl">
          Page not found
        </h1>
        <p className="mt-6 text-pretty text-lg text-gray-500 sm:text-xl/8">
          Sorry, we couldn’t find the page you’re looking for.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            href="/"
            className="bg-primary rounded-md px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Browse Songs
          </Link>
        </div>
      </div>
    </main>
  )
}

export default NotFoundPage
