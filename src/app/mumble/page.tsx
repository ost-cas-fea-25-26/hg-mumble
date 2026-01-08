import { fetchPosts } from '@/actions/posts/fetchPosts'
import PostsList from '@/components/post/PostsList'
import CreatePost from '@/components/post/create/CreatePost'
import { getSession } from '@/lib/auth'
import clsx from 'clsx'
import { getTranslations } from 'next-intl/server'
import { redirect } from 'next/navigation'

export default async function Home() {
  const sessionData = await getSession()
  const translate = await getTranslations('general')
  if (!sessionData?.session) {
    redirect('/auth/signin')
  }
  const posts = await fetchPosts({ limit: 10 })

  return (
    <div className={'mt-6 flex flex-col gap-4'}>
      <div>
        <h1 className={clsx('text-primary text-4xl font-bold')}>{translate('welcome-to-mumble')}</h1>
        <span className={clsx('text-secondary text-lg font-semibold')}>{translate('welcome-subtitle')}</span>
      </div>
      {sessionData && <CreatePost sessionData={sessionData} />}
      {posts.data && <PostsList initialPosts={posts.data} userName={sessionData?.user.name} />}
    </div>
  )
}
