'use client'
import React from 'react'
import useSWR from 'swr'
import { getPosts } from '@/mumble/api/posts/getPosts'
import Post from '@/components/Post'
import clsx from 'clsx'
import { useTranslations } from 'use-intl'

export default function FeedPage() {
  const { data } = useSWR('what', getPosts)
  const translate = useTranslations('general')
  return (
    <section className={'flex items-center justify-center bg-blue-100 pt-2'}>
      <div
        className={
          'desktop:w-fit-50! desktop:max-w-144! mb-24 flex h-fit w-full max-w-full flex-col items-center justify-center gap-2 rounded-md p-6'
        }
      >
        <div>
          <h1 className={clsx('text-primary text-4xl font-bold')}>
            {translate('welcome-to-mumble')}
          </h1>
          <span className={clsx('text-secondary text-lg font-semibold')}>
            {translate('welcome-subtitle')}
          </span>
        </div>

        {data?.data.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    </section>
  )
}
