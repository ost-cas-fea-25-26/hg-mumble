'use client'

import { fetchUser } from '@/actions/users/fetchUser'
import ReplyButtons from '@/components/post/reply/ReplyButtons'
import ReplySkeleton from '@/components/post/reply/ReplySkeleton'
import { useFormattedDate } from '@/utils/dates/useFormattedDate'
import clsx from 'clsx'
import React, { useEffect, useMemo, useState } from 'react'
import { decodeTime } from 'ulidx'
import { Avatar, Link, Profile, Time } from '@/lib/hg-storybook'
import { Reply as ReplyType, User } from '@/mumble/api/generated/MumbleApi'

interface Props {
  reply: ReplyType
}

export default function Reply({ reply }: Props) {
  const [userData, setUserData] = useState<User>({})
  const [isLoading, setIsLoading] = useState(true)
  const data = useFormattedDate(new Date(decodeTime(reply.id!)))
  const avatarPlaceholderText = useMemo(() => {
    if (userData.firstname && userData.lastname) {
      return userData.firstname.charAt(0) + userData.lastname.charAt(0)
    }
    return undefined
  }, [userData])
  useEffect(() => {
    fetchUser(reply.creator!.id!).then((response) => {
      setUserData(response)
      setIsLoading(false)
    })
  }, [])

  if (isLoading && !userData.username) {
    return <ReplySkeleton />
  }

  return (
    <div className="relative flex min-h-48 w-full flex-col justify-around gap-2 rounded-md bg-white p-4">
      <div className="desktop:h-16 flex w-full items-center justify-start gap-3">
        <Avatar src={userData.avatarUrl || undefined} size={'s'} borderless placeholderText={avatarPlaceholderText} />
        <div className="pl-1">
          <h3 className={clsx('text-lg font-bold')}>
            {userData?.firstname} {userData?.lastname}
          </h3>
          <div className="desktop:flex-row desktop:items-center desktop:gap-4 desktop:w-full flex flex-col gap-2">
            <Link
              url={`/mumble/profile/${reply.creator?.id}`}
              className={'text-primary flex items-center justify-start gap-1 font-bold'}
            >
              <Profile color={'currentColor'} size={'xs'} />
              <span>{userData?.username}</span>
            </Link>
            <span className={clsx('text-secondary-400 flex items-center gap-2 font-semibold')}>
              <Time size={'xs'} color={'currentColor'} />
              <span>{data}</span>
            </span>
          </div>
        </div>
      </div>
      <div>
        <div className="flex max-h-50 gap-4">
          {reply.mediaUrl && (
            <img
              className={'desktop:w-40 desktop:min-w-40 h-40 min-h-40 object-cover'}
              src={reply.mediaUrl}
              alt={'user uploaded file'}
            />
          )}
          {reply.text && (
            <p className={'max-h-full overflow-auto'} data-testid="reply-text">
              {reply.text}
            </p>
          )}
        </div>
      </div>
      <ReplyButtons reply={reply} />
    </div>
  )
}
