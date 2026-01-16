'use client'

import Reply from '@/components/post/reply/Reply'
import usePostCreated from '@/hooks/usePostCreated'
import { Reply as ReplyType } from '@/mumble/api/generated/MumbleApi'
import { useState } from 'react'

interface Props {
  initialReplies: ReplyType[]
}

export default function ReplyList({ initialReplies }: Props) {
  const [replies, setReplies] = useState<ReplyType[]>(initialReplies)

  usePostCreated(setReplies, replies)

  return (
    <div data-testid="reply-list">
      {replies &&
        replies?.map((posts) => {
          return <Reply reply={posts} key={posts.id} />
        })}
    </div>
  )
}
