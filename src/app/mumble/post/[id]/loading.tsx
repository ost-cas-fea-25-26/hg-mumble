import PostSkeleton from '@/components/post/PostSkeleton'
import CreateReplySkeleton from '@/components/post/create/CreateReplySkeleton'
import ReplySkeleton from '@/components/post/reply/ReplySkeleton'
import React from 'react'

export default function Loading() {
  return (
    <div className="mt-28 w-full rounded-md bg-white">
      <PostSkeleton />
      <div className="p-6">
        <CreateReplySkeleton />
        <div>
          <ReplySkeleton />
          <ReplySkeleton />
          <ReplySkeleton />
        </div>
      </div>
    </div>
  )
}
