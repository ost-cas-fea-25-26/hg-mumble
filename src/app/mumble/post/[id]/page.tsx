import { fetchComments } from '@/actions/posts/comments/fetchComments'
import { fetchPost } from '@/actions/posts/fetchPost'
import CreateReply from '@/components/post/CreateReply'
import Post from '@/components/post/Post'
import Reply from '@/components/post/reply/Reply'
import React from 'react'
import { ReplyPaginatedResult } from '@/mumble/api/generated/MumbleApi'

interface Props {
  params: Promise<{
    id: string
  }>
}

export default async function Page({ params }: Props) {
  const postId = (await params).id
  const post = await fetchPost(postId)
  const repliesData = await fetchComments(postId)

  const replies = repliesData as ReplyPaginatedResult

  return (
    <div className="w-full rounded-md bg-white">
      {post && <Post post={post} />}
      <div className="p-6">
        <CreateReply postId={postId} />
        {replies &&
          replies.data?.map((reply) => {
            return <Reply reply={reply} key={reply.id} />
          })}
      </div>
    </div>
  )
}
