'use client'

import { addLike } from '@/actions/posts/like/addLike'
import { removeLike } from '@/actions/posts/like/removeLike'
import { Heart, HeartEmpty, Share, SpeechBubbleEmpty, TimedButton, Toggle } from 'hg-storybook'
import Link from 'next/link'
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

  const copyToClipboard = () => {
    if (navigator.clipboard && window.isSecureContext) {
      const url = window.location.origin + '/mumble/post/' + post.id
      return navigator.clipboard.writeText(url)
    }
  }

  return (
    <div className="flex flex-wrap">
      <Link
        href={'/mumble/post/' + post.id}
        className="text-secondary hover:not-data-disabled:bg-primary-50 hover:not-data-disabled:text-primary-700 flex items-center gap-1 rounded-full p-1 pr-2 pl-2 font-bold hover:not-data-disabled:cursor-pointer group-data-disabled:hover:cursor-not-allowed"
        data-testid="post-comments-link"
        scroll={false}
      >
        <SpeechBubbleEmpty color={'currentColor'} size={'xs'} />
        <p className="hover:not-data-disabled:cursor-pointer group-data-disabled:hover:cursor-not-allowed">
          {translate('comments', { count: post.replies || 0 })}
        </p>
      </Link>
      <Toggle
        color={'contrast'}
        initialChecked={Boolean(post.likedBySelf)}
        data-testid="post-like-toggle"
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
          <div className={'text-secondary flex items-center gap-2'} data-testid="post-copy-link-success">
            <Share color={'currentColor'} size={'xs'} />
            <span>{translate('link-copied')}</span>
          </div>
        }
        childrenOnClick={<></>}
        animationDuration={2000}
      >
        <div className={'text-secondary flex items-center gap-2'} data-testid="post-copy-link-button">
          <Share color={'currentColor'} size={'xs'} />
          <span>{translate('link-copy')}</span>
        </div>
      </TimedButton>
    </div>
  )
}
