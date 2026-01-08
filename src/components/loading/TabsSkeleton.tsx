export default function TabsSkeleton() {
  return (
    <div className="bg-secondary-200 flex w-fit flex-row rounded p-1">
      <div className="h-11 w-32 rounded bg-slate-200 animate-pulse mr-2" />
      <div className="h-11 w-32 rounded bg-slate-200 animate-pulse ml-2" />
    </div>
  )
}
