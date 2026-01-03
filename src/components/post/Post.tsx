'use client'
import PostButtons from '@/components/post/PostButtons'
import { Avatar, Link, Profile, Time } from '@/lib/hg-storybook'
import { Post as MumblePost } from '@/mumble/api/generated/MumbleApi'
import { useFormattedDate } from '@/utils/dates/useFormattedDate'
import { getAvatarInitials } from '@/utils/getAvatarInitials'
import clsx from 'clsx'
import { decodeTime } from 'ulidx'

export default function Post({ post }: { post: MumblePost }) {
  const date = useFormattedDate(new Date(decodeTime(post.id!)))
  const avatarPlaceholderText = getAvatarInitials(post.creator?.displayName || post.creator?.username)

  return (
    <div className="relative flex min-h-48 w-full flex-col justify-around gap-2 rounded-md bg-white p-4" id={post.id}>
      <div className="desktop:h-16 flex w-full items-center justify-start gap-3">
        <div className="absolute top-6 -left-6">
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
      <div className="desktop:mt-0 mt-4 ml-6">
        <div className={'flex max-h-50 gap-4'}>
          {post.mediaUrl && (
            <img
              className={'desktop:w-40 desktop:min-w-40 h-40 min-h-40 object-cover'}
              src={post.mediaUrl}
              alt={'user uploaded file'}
            />
          )}
          {post.text && (
            <p className={'max-h-full overflow-auto break-all hyphens-auto'} data-testid="post-content">
              {post.text}
            </p>
          )}
        </div>
      </div>
      <PostButtons post={post} />
    </div>
  )
}
