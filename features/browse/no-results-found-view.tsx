export function NotResultsFoundView({ query }: { query?: string }) {
  return (
    <div className="py-6 text-center">
      <p className="text-primary text-base font-semibold">Ooops</p>
      <h1 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-white sm:text-3xl">
        {query ? `No results found for "${query}"` : "No results found"}
      </h1>
      <p className="mt-6 text-pretty text-gray-500">
        Try searching for other songs.
      </p>
    </div>
  )
}
