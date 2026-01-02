import PostSkeleton from '@/components/post/PostSkeleton'
import CreatePostSkeleton from '@/components/post/create/CreatePostSkeleton'
import clsx from 'clsx'
import { getTranslations } from 'next-intl/server'

export default async function Loading() {
  const translate = await getTranslations('general')

  return (
    <div className={'mt-6 flex flex-col gap-4'}>
      <div>
        <h1 className={clsx('text-primary text-4xl font-bold')}>{translate('welcome-to-mumble')}</h1>
        <span className={clsx('text-secondary text-lg font-semibold')}>{translate('welcome-subtitle')}</span>
      </div>
      <CreatePostSkeleton />
      <PostSkeleton />
      <PostSkeleton />
      <PostSkeleton />
    </div>
  )
}
