'use client'
import { fetchUser } from '@/actions/users/fetchUser'
import LoadingText from '@/components/loading/LoadingText'
import PostButtons from '@/components/post/PostButtons'
import { useFormattedDate } from '@/utils/dates/useFormattedDate'
import clsx from 'clsx'
import React, { useEffect, useState } from 'react'
import { decodeTime } from 'ulidx'
import { Avatar, Link, Profile, Time } from '@/lib/hg-storybook'
import { Post as MumblePost, User } from '@/mumble/api/generated/MumbleApi'

export default function Post({ post }: { post: MumblePost }) {
  const [userData, setUserData] = useState<User>({})
  const [isLoading, setIsLoading] = useState(true)
  //todo: ggf. wird api noch um die nötigen daten erweitert dass wir die user nicht noch separat laden müssen
  useEffect(() => {
    fetchUser(post.creator!.id!).then((response) => {
      setUserData(response)
      setIsLoading(false)
    })
  }, [])

  return (
    <div className="relative flex min-h-48 w-full flex-col justify-around gap-2 rounded-md bg-white pt-26 pr-4 pb-4 pl-4">
      <div
        className={clsx(
          //left -32 because avatar-width is 64
          'absolute top-6 left-[-32] flex h-16 w-full items-center justify-start gap-3'
        )}
      >
        <Avatar src={userData.avatarUrl || undefined} size={'m'} />
        <div>
          <h3 className={clsx('text-lg font-bold')}>
            {isLoading ? <LoadingText width={'w-32'} /> : `${userData?.firstname} ${userData?.lastname}`}
          </h3>
          <div className={clsx('flex items-center gap-4')}>
            <Link
              url={`/mumble/profile/${post.creator?.id}`}
              className={'text-primary flex items-center justify-start gap-1 font-bold'}
            >
              {isLoading ? (
                <LoadingText width={'w-25'} />
              ) : (
                <>
                  <Profile color={'currentColor'} size={'xs'} />
                  <span>{userData?.username}</span>
                </>
              )}
            </Link>
            <span className={clsx('text-secondary-400 flex items-center gap-2 font-semibold')}>
              <Time size={'xs'} color={'currentColor'} />
              <span>{useFormattedDate(new Date(decodeTime(post.id!)))}</span>
            </span>
          </div>
        </div>
      </div>
      {/*content*/}
      <div className={clsx('ml-6')}>
        <div className={'flex max-h-50 gap-4'}>
          {post.mediaUrl && (
            <img
              className={'desktop:w-40 desktop:min-w-40 h-40 min-h-40 object-cover'}
              src={post.mediaUrl}
              alt={'user uploaded file'}
            />
          )}
          {post.text && <p className={'max-h-full overflow-auto break-all hyphens-auto'}>{post.text}</p>}
        </div>
      </div>
      <PostButtons post={post} />
    </div>
  )
}
