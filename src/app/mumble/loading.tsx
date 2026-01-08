import PageHeader from '@/components/general/PageHeader'
import TabsSkeleton from '@/components/loading/TabsSkeleton'
import PostSkeleton from '@/components/post/PostSkeleton'
import CreatePostSkeleton from '@/components/post/create/CreatePostSkeleton'
import { getTranslations } from 'next-intl/server'

export default async function Loading() {
  const translate = await getTranslations('general')

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
