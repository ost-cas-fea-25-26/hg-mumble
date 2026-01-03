'use client'

import PostContent from '@/components/post/PostContent'
import ReplyButtons from '@/components/post/reply/ReplyButtons'
import { Avatar, Link, Profile, Time } from '@/lib/hg-storybook'
import { Reply as ReplyType } from '@/mumble/api/generated/MumbleApi'
import { useFormattedDate } from '@/utils/dates/useFormattedDate'
import clsx from 'clsx'
import { useMemo, useState } from 'react'
import { decodeTime } from 'ulidx'

interface Props {
  reply: ReplyType
}

export default function Reply({ reply }: Props) {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const data = useFormattedDate(new Date(decodeTime(reply.id!)))
  const avatarPlaceholderText = useMemo(() => {
    if (reply.creator?.displayName) {
      const names = reply.creator.displayName.split(' ')
      if (names.length >= 2) {
        return names[0].charAt(0) + names[1].charAt(0)
      }
    }
    return undefined
  }, [reply.creator])

  return (
    <div className="relative flex min-h-48 w-full flex-col justify-around gap-2 rounded-md bg-white p-4">
      <div className="desktop:h-16 flex w-full items-center justify-start gap-3">
        <Avatar
          src={reply.creator?.avatarUrl || undefined}
          size={'s'}
          borderless
          placeholderText={avatarPlaceholderText}
        />
        <div className="pl-1">
          <h3 className={clsx('text-lg font-bold')}>{reply.creator?.displayName}</h3>
          <div className="desktop:flex-row desktop:items-center desktop:gap-4 desktop:w-full flex flex-col gap-2">
            <Link
              url={`/mumble/profile/${reply.creator?.id}`}
              className={'text-primary flex items-center justify-start gap-1 font-bold'}
            >
              <Profile color={'currentColor'} size={'xs'} />
              <span>{reply.creator?.username}</span>
            </Link>
            <span className={clsx('text-secondary-400 flex items-center gap-2 font-semibold')}>
              <Time size={'xs'} color={'currentColor'} />
              <span>{data}</span>
            </span>
          </div>
        </div>
      </div>
      <div data-testid="reply-content">
        <PostContent text={reply.text} mediaUrl={reply.mediaUrl} />
      </div>
      <ReplyButtons reply={reply} />
    </div>
  )
}
