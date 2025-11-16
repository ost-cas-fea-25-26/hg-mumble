'use client'
import React from 'react'
import useSWR from 'swr'
import { getPosts } from '@/mumble/api/posts/getPosts'
import Post from '@/components/Post'

export default function FeedPage() {
  const { data } = useSWR('what', getPosts)
  return (
    <section className={'bg-primary flex items-center justify-center'}>
      <div
        className={
          'mb-24 flex h-fit w-fit flex-col items-center justify-center gap-2 rounded-md bg-white p-6 sm:w-1/2'
        }
      >
        {data?.data.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    </section>
  )
}
