'use client'
import Post from '@/components/Post'
import useApi from '@/hooks/data/useApi'
import { fetchPosts } from '@/methods/data/posts/fetchPosts'
import { MumblePostsList } from '@/types'
import clsx from 'clsx'
import { Loader } from 'hg-storybook'
import React from 'react'
import { useTranslations } from 'use-intl'

export default function Home() {
  const [postsQueryParams, _setPostsQueryParams] = React.useState<Record<string, string>>({})
  const { data, isLoading } = useApi<MumblePostsList>('api/posts', new URLSearchParams(postsQueryParams), fetchPosts)
  const translate = useTranslations('general')

  if (isLoading || !data)
    return (
      <div className={'flex h-full flex-col items-center justify-center'}>
        <Loader size={'large'} color={'primary'} />
      </div>
    )

  const { data: posts } = data!

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

        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    </section>
  )
}
