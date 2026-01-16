export default function RecommendedProfilesSkeleton() {
  return (
    <section>
      <div className="h-9 w-56 rounded bg-slate-200 animate-pulse mb-4" />

      <div className="grid grid-cols-1 desktop:grid-cols-3 gap-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm h-full justify-between">
            <div className="flex flex-col items-center w-full">
              <div className="size-24 rounded-full bg-slate-200 animate-pulse" />

              <div className="h-7 w-32 rounded bg-slate-200 animate-pulse mt-2" />

              <div className="flex items-center gap-1 mt-2 mb-4">
                <div className="h-3 w-3 rounded bg-slate-200 animate-pulse" />
                <div className="h-4 w-20 rounded bg-slate-200 animate-pulse" />
              </div>
            </div>

            <div className="w-full mt-4">
              <div className="h-12 w-full rounded bg-slate-200 animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
