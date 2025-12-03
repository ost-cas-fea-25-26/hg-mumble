'use client'
import { fetchUser } from '@/actions/users/fetchUser'
import PostButtons from '@/components/PostButtons'
import clsx from 'clsx'
import React, { useEffect, useState } from 'react'
import { Avatar, Link, Profile, Time } from '@/lib/hg-storybook'
import { Post as MumblePost, User } from '@/mumble/api/generated/MumbleApi'

export default function Post({ post }: { post: MumblePost }) {
  const [userData, setUserData] = useState<User>({})

  //todo: ggf. wird api noch um die nötigen daten erweitert dass wir die user nicht noch separat laden müssen
  useEffect(() => {
    fetchUser(post.creator!.id!).then(setUserData)
  }, [])

  return (
    <div className="relative m-2 flex min-h-48 w-full flex-col justify-around gap-2 rounded-md bg-white pt-26 pr-4 pb-4 pl-4">
      <div
        className={clsx(
          //left -32 because avatar-width is 64
          'absolute top-6 left-[-32] flex h-16 w-full items-center justify-start gap-3'
        )}
      >
        {userData?.avatarUrl ? <Avatar src={userData.avatarUrl} size={'m'} /> : <div className={'w-16'} />}
        <div>
          <h3 className={clsx('text-lg font-bold')}>{`${userData?.firstname} ${userData?.lastname}`}</h3>
          <div className={clsx('flex items-center gap-4')}>
            <Link
              url={`user-profile/${post.creator}`}
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
      <div className={clsx('ml-6')}>
        <div className={'flex max-h-50 gap-4'}>
          {post.mediaUrl && (
            <img
              className={'h-40 min-h-40 w-40 min-w-40 object-cover'}
              src={post.mediaUrl}
              alt={'user uploaded file'}
            />
          )}
          {post.text && <p className={'max-h-full overflow-auto'}>{post.text}</p>}
        </div>
      </div>
      <PostButtons post={post} />
    </div>
  )
}
