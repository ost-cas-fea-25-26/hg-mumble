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
    <>
      <div>
        <h1 className={clsx('text-primary text-4xl font-bold')}>{translate('welcome-to-mumble')}</h1>
        <span className={clsx('text-secondary text-lg font-semibold')}>{translate('welcome-subtitle')}</span>
      </div>
      {sessionData && <CreatePost />}
      {posts.data && <PostsList initialPosts={posts.data} />}
    </>
  )
}
