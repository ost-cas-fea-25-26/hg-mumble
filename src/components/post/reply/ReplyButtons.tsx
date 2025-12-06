'use client'

import { addLike } from '@/actions/posts/like/addLike'
import { removeLike } from '@/actions/posts/like/removeLike'
import { Heart, HeartEmpty, Share, SpeechBubble, SpeechBubbleEmpty, TimedButton, Toggle } from 'hg-storybook'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useTranslations } from 'use-intl'
import { Post, Reply } from '@/mumble/api/generated/MumbleApi'

type Props = {
  reply: Reply
}

export default function ReplyButtons({ reply }: Props) {
  const translate = useTranslations('mumble-post')
  const [likes, setLikes] = React.useState(reply.likes || 0)
  const [likedBySelf, setLikedBySelf] = React.useState(Boolean(reply.likedBySelf))

  return (
    <div className="flex flex-wrap">
      <Toggle
        color={'contrast'}
        initialChecked={Boolean(reply.likedBySelf)}
        onChange={() => {
          if (!likedBySelf) {
            setLikes(likes + 1)
            setLikedBySelf(true)
            return addLike(reply.id!)
          } else {
            setLikes(likes - 1)
            setLikedBySelf(false)
            return removeLike(reply.id!)
          }
        }}
        checkedProps={{
          icon: <Heart color={'currentColor'} size={'xs'} />,
          label: translate('likes', { count: likes }),
        }}
        uncheckedProps={{
          icon: <HeartEmpty color={'currentColor'} size={'xs'} />,
          label: translate('likes', { count: likes }),
        }}
      />
    </div>
  )
}
