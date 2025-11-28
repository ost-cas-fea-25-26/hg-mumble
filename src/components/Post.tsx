'use client'
import PostComments from '@/components/PostComments'
import { addLike } from '@/methods/data/posts/addLike'
import { fetchUser } from '@/methods/data/users/fetchUser'
import { MumblePost } from '@/types'
import clsx from 'clsx'
import {
  Avatar,
  Heart,
  HeartEmpty,
  Link,
  Profile,
  Share,
  SpeechBubble,
  SpeechBubbleEmpty,
  Time,
  TimedButton,
  Toggle,
} from 'hg-storybook'
import { useEffect, useState } from 'react'
import useSWR from 'swr'
import useSWRMutation from 'swr/mutation'
import { useTranslations } from 'use-intl'

export default function Post({ post }: { post: MumblePost }) {
  const { data: userDetails } = useSWR(`api/users/${post.creator}`, fetchUser)
  const { trigger: likePost } = useSWRMutation(`api/posts/${post.id}/like`, addLike)
  const translate = useTranslations('mumble-post')
  const [showCommentInput, setShowCommentInput] = useState<boolean>(false)

  return (
    <div className="relative m-2 flex min-h-48 w-full flex-col justify-around gap-2 rounded-md bg-white pt-26 pr-4 pb-4 pl-4">
      <div
        className={clsx(
          //left -32 because avatar-width is 64
          'absolute top-6 left-[-32] flex h-16 w-full items-center justify-start gap-3'
        )}
      >
        <Avatar src={userDetails?.avatarUrl} size={'m'} />
        <div>
          <h3 className={clsx('text-lg font-bold')}>{`${userDetails?.firstName} ${userDetails?.lastName}`}</h3>
          <div className={clsx('flex items-center gap-4')}>
            <Link
              url={`user-profile/${post.creator}`}
              className={'text-primary flex items-center justify-start gap-1 font-bold'}
            >
              <Profile color={'currentColor'} size={'xs'} />
              <span>{userDetails?.userName}</span>
            </Link>
            <span className={clsx('text-secondary-400 font-semibold')}>
              <Time size={'xs'} color={'currentColor'} />
            </span>
          </div>
        </div>
      </div>
      {/*content*/}
      <div className={clsx('ml-6')}>{post.text && <p>{post.text}</p>}</div>
      {/* buttons */}
      <div className="flex">
        <Toggle
          color={'primary'}
          onChange={() => {
            setShowCommentInput((prev) => !prev)
          }}
          uncheckedProps={{
            icon: <SpeechBubbleEmpty color={'currentColor'} size={'xs'} />,
            label: translate('comments', { count: post.replyCount }),
          }}
          checkedProps={{
            icon: <SpeechBubble color={'currentColor'} size={'xs'} />,
            label: translate('comments', { count: post.replyCount }),
          }}
        />
        <Toggle
          color={'contrast'}
          onChange={() => likePost()}
          checkedProps={{
            icon: <Heart color={'currentColor'} size={'xs'} />,
            label: translate('liked'),
          }}
          uncheckedProps={{
            icon: <HeartEmpty color={'currentColor'} size={'xs'} />,
            label: translate('likes', { count: post.likeCount }),
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
      {showCommentInput && <PostComments postId={post.id} />}
    </div>
  )
}
