'use client'
import PostButtons from '@/components/post/PostButtons'
import PostContent from '@/components/post/PostContent'
import { Avatar, Link, Profile, Time } from '@/lib/hg-storybook'
import { Post as MumblePost } from '@/mumble/api/generated/MumbleApi'
import { useFormattedDate } from '@/utils/dates/useFormattedDate'
import clsx from 'clsx'
import { useMemo } from 'react'
import { decodeTime } from 'ulidx'

export default function Post({ post }: { post: MumblePost }) {
  const date = useFormattedDate(new Date(decodeTime(post.id!)))
  const avatarPlaceholderText = useMemo(() => {
    if (post.creator?.displayName) {
      const names = post.creator.displayName.split(' ')
      if (names.length >= 2) {
        return names[0].charAt(0) + names[1].charAt(0)
      }
    }
    return undefined
  }, [post.creator])

  return (
    <div className="relative flex min-h-48 w-full flex-col justify-around gap-2 rounded-md bg-white p-4" id={post.id}>
      <div className="desktop:h-16 flex w-full items-center justify-start gap-3">
        <div className="absolute top-6 left-[-32]">
          <Avatar src={post.creator?.avatarUrl || undefined} placeholderText={avatarPlaceholderText} size={'m'} />
        </div>
        <div className="pl-6">
          <h3 className={clsx('text-lg font-bold')}>{post.creator?.displayName}</h3>
          <div className="desktop:flex-row desktop:items-center desktop:gap-4 desktop:w-full flex flex-col gap-2">
            <Link
              url={`/mumble/profile/${post.creator?.id}`}
              className={'text-primary flex items-center justify-start gap-1 font-bold'}
            >
              <Profile color={'currentColor'} size={'xs'} />
              <span>{post.creator?.username}</span>
            </Link>
            <span className={clsx('text-secondary-400 flex items-center gap-2 font-semibold')}>
              <Time size={'xs'} color={'currentColor'} />
              <span>{date}</span>
            </span>
          </div>
        </div>
      </div>
      <div className="desktop:mt-0 mt-4 mx-6">
        <PostContent text={post.text} mediaUrl={post.mediaUrl} />
      </div>
      <PostButtons post={post} />
    </div>
  )
}
