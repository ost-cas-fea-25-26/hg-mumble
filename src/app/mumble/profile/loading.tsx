import PostSkeleton from '@/components/post/PostSkeleton'
import { Avatar } from 'hg-storybook'

export default function Loading() {
  return (
    <section className="my-6 w-full">
      <div className="mb-6 flex flex-col items-center justify-center gap-5">
        <div className="relative w-full">
          <div className="h-80 w-full rounded-md bg-slate-200 animate-pulse" />

          <div className="absolute right-6 -bottom-16.5">
            <Avatar src={undefined} size={'xl'} />
          </div>
        </div>

        <div className="flex w-full flex-col gap-4 mt-6 desktop:mt-2">
          <div className="h-10 w-64 rounded bg-slate-200 animate-pulse" />

          <div className="flex gap-4">
            <div className="h-5 w-24 rounded bg-slate-200 animate-pulse" />
            <div className="h-5 w-24 rounded bg-slate-200 animate-pulse" />
          </div>
        </div>
      </div>

      <div className="mt-6">
        <div className="flex flex-col gap-4">
          <PostSkeleton />
          <PostSkeleton />
          <PostSkeleton />
        </div>
      </div>
    </section>
  )
}
