'use client'

import Post from '@/components/Post'
import { Schema } from '@/interfaces/Schema'
import fetcher from '@/methods/data/fetcher'
import clsx from 'clsx'
import { Loader } from 'hg-storybook'
import React, { useEffect } from 'react'
import useSWR from 'swr'
import { useTranslations } from 'use-intl'

export default function Home() {
  const translate = useTranslations('general')
  const { data: posts, isLoading } = useSWR<Schema<'Posts'>>('api/posts', fetcher)

  useEffect(() => {
    console.log(posts)
  }, [posts])

  if (isLoading || !posts)
    return (
      <div className={'flex h-full flex-col items-center justify-center'}>
        <Loader size={'large'} color={'primary'} />
      </div>
    )

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

        {posts.data.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    </section>
  )
}
