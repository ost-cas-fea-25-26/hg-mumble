import { fetchPosts } from '@/actions/posts/fetchPosts'
import CreatePost from '@/components/CreatePost'
import PostsList from '@/components/PostsList'
import clsx from 'clsx'
import { getTranslations } from 'next-intl/server'
import React from 'react'
import { getSession } from '@/lib/auth'

export default async function Home() {
  const sessionData = await getSession()
  const translate = await getTranslations('general')
  const posts = await fetchPosts({ limit: 10 })

  return (
    <section className={'flex items-center justify-center bg-blue-100 pt-2'}>
      <div
        className={
          'desktop:w-fit-50! desktop:max-w-144! mb-24 flex h-fit w-full max-w-full flex-col items-center justify-center gap-2 rounded-md p-6'
        }
      >
        <div>
          <h1 className={clsx('text-primary text-4xl font-bold')}>{translate('welcome-to-mumble')}</h1>
          <span className={clsx('text-secondary text-lg font-semibold')}>{translate('welcome-subtitle')}</span>
        </div>
        {sessionData && <CreatePost />}
        {posts.data && <PostsList initialPosts={posts.data} />}
      </div>
    </section>
  )
}
