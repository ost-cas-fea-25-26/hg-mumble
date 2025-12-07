'use client'

import { fetchUser } from '@/actions/users/fetchUser'
import ReplyButtons from '@/components/post/reply/ReplyButtons'
import clsx from 'clsx'
import React, { useEffect, useState } from 'react'
import { Avatar, Link, Profile, Time } from '@/lib/hg-storybook'
import { Reply as ReplyType, User } from '@/mumble/api/generated/MumbleApi'

interface Props {
  reply: ReplyType
}

export default function Reply({ reply }: Props) {
  const [userData, setUserData] = useState<User>({})
  useEffect(() => {
    fetchUser(reply.creator!.id!).then(setUserData)
  }, [])

  return (
    <div className="relative flex min-h-48 w-full flex-col justify-around gap-2 rounded-md bg-white p-4">
      <div
        className={clsx(
          //left -32 because avatar-width is 64
          'flex h-16 w-full items-center justify-start gap-3'
        )}
      >
        <Avatar src={userData.avatarUrl || undefined} size={'xs'} />
        <div>
          <h3 className={clsx('text-lg font-bold')}>{`${userData?.firstname} ${userData?.lastname}`}</h3>
          <div className={clsx('flex items-center gap-4')}>
            <Link
              url={`/profile/${reply.creator?.id}`}
              className={'text-primary flex items-center justify-start gap-1 font-bold'}
            >
              <Profile color={'currentColor'} size={'xs'} />
              <span>{userData?.username}</span>
            </Link>
            <span className={clsx('text-secondary-400 font-semibold')}>
              <Time size={'xs'} color={'currentColor'} />
            </span>
          </div>
        </div>
      </div>
      {/*content*/}
      <div>
        <div className={'flex max-h-50 gap-4'}>
          {reply.mediaUrl && (
            <img
              className={'desktop:w-40 desktop:min-w-40 h-40 min-h-40 object-cover'}
              src={reply.mediaUrl}
              alt={'user uploaded file'}
            />
          )}
          {reply.text && <p className={'max-h-full overflow-auto'}>{reply.text}</p>}
        </div>
      </div>
      <ReplyButtons reply={reply} />
    </div>
  )
}
