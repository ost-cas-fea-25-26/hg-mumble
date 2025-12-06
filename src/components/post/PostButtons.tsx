'use client'

import { addLike } from '@/actions/posts/like/addLike'
import { removeLike } from '@/actions/posts/like/removeLike'
import { Heart, HeartEmpty, Share, SpeechBubble, SpeechBubbleEmpty, TimedButton, Toggle } from 'hg-storybook'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useTranslations } from 'use-intl'
import { Post } from '@/mumble/api/generated/MumbleApi'

type Props = {
  post: Post
}

export default function PostButtons({ post }: Props) {
  const translate = useTranslations('mumble-post')
  const [likes, setLikes] = React.useState(post.likes || 0)
  const [likedBySelf, setLikedBySelf] = React.useState(Boolean(post.likedBySelf))
  const router = useRouter()

  const copyToClipboard = () => {
    if (navigator.clipboard && window.isSecureContext) {
      const url = window.location.origin + '/post/' + post.id
      return navigator.clipboard.writeText(url)
    }
  }

  return (
    <div className="flex flex-wrap">
      <Toggle
        color={'primary'}
        uncheckedProps={{
          icon: <SpeechBubbleEmpty color={'currentColor'} size={'xs'} />,
          label: translate('comments', { count: post.replies as number }),
        }}
        checkedProps={{
          icon: <SpeechBubbleEmpty color={'currentColor'} size={'xs'} />,
          label: translate('comments', { count: post.replies as number }),
        }}
        onChange={() => {
          router.push('/post/' + post.id)
        }}
      />
      <Toggle
        color={'contrast'}
        initialChecked={Boolean(post.likedBySelf)}
        onChange={() => {
          if (!likedBySelf) {
            setLikes(likes + 1)
            setLikedBySelf(true)
            return addLike(post.id!)
          } else {
            setLikes(likes - 1)
            setLikedBySelf(false)
            return removeLike(post.id!)
          }
        }}
        checkedProps={{
          icon: <Heart color={'currentColor'} size={'xs'} />,
          label: translate('likes', { count: likes as number }),
        }}
        uncheckedProps={{
          icon: <HeartEmpty color={'currentColor'} size={'xs'} />,
          label: translate('likes', { count: likes as number }),
        }}
      />
      <TimedButton
        onClick={copyToClipboard}
        childrenOnSuccess={
          <div className={'text-secondary flex items-center gap-2'}>
            <Share color={'currentColor'} size={'xs'} />
            <span>{translate('link-copied')}</span>
          </div>
        }
        childrenOnClick={<></>}
        animationDuration={2000}
      >
        <div className={'text-secondary flex items-center gap-2'}>
          <Share color={'currentColor'} size={'xs'} />
          <span>{translate('link-copy')}</span>
        </div>
      </TimedButton>
    </div>
  )
}
