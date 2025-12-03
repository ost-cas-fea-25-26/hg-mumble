'use client'

import { addLike } from '@/actions/posts/like/addLike'
import { removeLike } from '@/actions/posts/like/removeLike'
import { Heart, HeartEmpty, Share, SpeechBubble, SpeechBubbleEmpty, TimedButton, Toggle } from 'hg-storybook'
import React from 'react'
import { useTranslations } from 'use-intl'
import { Post } from '@/mumble/api/generated/MumbleApi'

type Props = {
  post: Post
}

export default function PostButtons({ post }: Props) {
  const translate = useTranslations('mumble-post')
  return (
    <div className="flex">
      <Toggle
        color={'primary'}
        uncheckedProps={{
          icon: <SpeechBubbleEmpty color={'currentColor'} size={'xs'} />,
          label: translate('comments', { count: post.replies as number }),
        }}
        checkedProps={{
          icon: <SpeechBubble color={'currentColor'} size={'xs'} />,
          label: translate('comments', { count: post.replies as number }),
        }}
      />
      <Toggle
        color={'contrast'}
        initialChecked={Boolean(post.likedBySelf)}
        onChange={() => {
          if (!post.likedBySelf) {
            return addLike(post.id!)
          } else {
            return removeLike(post.id!)
          }
        }}
        checkedProps={{
          icon: <Heart color={'currentColor'} size={'xs'} />,
          label: translate('liked'),
        }}
        uncheckedProps={{
          icon: <HeartEmpty color={'currentColor'} size={'xs'} />,
          label: translate('likes', { count: post.likes as number }),
        }}
      />
      <TimedButton
        onClick={() => {}}
        childrenOnClick={
          <div className={'text-secondary flex items-center gap-2'}>
            <Share color={'currentColor'} size={'xs'} />
            <span>{translate('link-copied')}</span>
          </div>
        }
        animationDuration={1250}
      >
        <div className={'text-secondary flex items-center gap-2'}>
          <Share color={'currentColor'} size={'xs'} />
          <span>{translate('link-copy')}</span>
        </div>
      </TimedButton>
    </div>
  )
}
