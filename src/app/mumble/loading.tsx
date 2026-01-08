import PageHeader from '@/components/general/PageHeader'
import TabsSkeleton from '@/components/loading/TabsSkeleton'
import PostSkeleton from '@/components/post/PostSkeleton'
import CreatePostSkeleton from '@/components/post/create/CreatePostSkeleton'

export default async function Loading() {
  return (
    <div className={'mt-6 flex flex-col gap-4'}>
      <PageHeader />
      <CreatePostSkeleton />
      <TabsSkeleton />
      <PostSkeleton />
      <PostSkeleton />
      <PostSkeleton />
    </div>
  )
}
