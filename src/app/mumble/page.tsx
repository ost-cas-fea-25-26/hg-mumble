import { fetchPosts } from '@/actions/posts/fetchPosts'
import CreatePost from '@/components/post/CreatePost'
import PostsList from '@/components/post/PostsList'
import clsx from 'clsx'
import { getTranslations } from 'next-intl/server'
import { redirect } from 'next/navigation'
import React, { ReactNode } from 'react'
import { getSession } from '@/lib/auth'

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
      {sessionData && <CreatePost />}
      {posts.data && <PostsList initialPosts={posts.data} />}
    </div>
  )
}
