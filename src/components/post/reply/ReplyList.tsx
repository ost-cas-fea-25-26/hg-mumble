'use client'

import Reply from '@/components/post/reply/Reply'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { useTranslations } from 'use-intl'
import { Post as MumblePost, Reply as ReplyType } from '@/mumble/api/generated/MumbleApi'

interface Props {
  initialReplies: ReplyType[]
}

function getPostEventSource() {
  return new EventSource(`${process.env.NEXT_PUBLIC_API_URL}/posts/_sse`)
}

export default function ReplyList({ initialReplies }: Props) {
  const [replies, setReplies] = useState<ReplyType[]>(initialReplies)
  const translate = useTranslations('mumble-reply')

  const onPostCreated = (event: MessageEvent<string>) => {
    const reply = JSON.parse(event.data) as MumblePost
    setReplies((prev) => [reply, ...prev])
    toast(translate('new-reply'), {
      action: {
        label: translate('see-now'),
        onClick: () => window.scrollTo(0, 0),
      },
    })
  }

  useEffect(() => {
    const events = getPostEventSource()
    events.addEventListener('postCreated', onPostCreated)
    return () => {
      events.close()
    }
  }, [])

  return (
    <div>
      {replies &&
        replies?.map((posts) => {
          return <Reply reply={posts} key={posts.id} />
        })}
    </div>
  )
}
