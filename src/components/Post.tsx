import { MumblePost } from '@/mumble/api/posts/createPost'
import useSWR from 'swr'
import { getUser } from '@/mumble/api/users/getUser'
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
import clsx from 'clsx'

export default function Post({ post }: { post: MumblePost }) {
  const { data } = useSWR('user', () => getUser(post.creator))
  return (
    <div className="relative m-2 flex min-h-48 w-full flex-col justify-around gap-2 rounded-md bg-white pt-26 pr-4 pb-4 pl-4">
      <div
        className={clsx(
          //left -32 because avatar-width is 64
          'absolute top-6 left-[-32] flex h-16 w-full items-center justify-start gap-3',
        )}
      >
        <Avatar src={data?.avatarUrl} size={'m'} />
        <div>
          <h3
            className={clsx('text-lg font-bold')}
          >{`${data?.firstName} ${data?.lastName}`}</h3>
          <div className={clsx('flex items-center gap-4')}>
            <Link
              url={'feed'}
              className={
                'text-primary flex items-center justify-start gap-1 font-bold'
              }
            >
              <Profile color={'currentColor'} size={'xs'} />
              <span>{data?.userName}</span>
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
          onChange={() => {}}
          uncheckedProps={{
            icon: <SpeechBubbleEmpty color={'currentColor'} size={'xs'} />,
            label: `${post.replyCount ?? 0} replies`,
          }}
          checkedProps={{
            icon: <SpeechBubble color={'currentColor'} size={'xs'} />,
            label: `${post.replyCount ?? 0} replies`,
          }}
        />
        <Toggle
          color={'contrast'}
          checkedProps={{
            icon: <Heart color={'currentColor'} size={'xs'} />,
            label: `${post.replyCount ?? 0} replies`,
          }}
          uncheckedProps={{
            icon: <HeartEmpty color={'currentColor'} size={'xs'} />,
            label: `${post.replyCount ?? 0} replies`,
          }}
        />
        <TimedButton
          onClick={() => {}}
          childrenOnClick={
            <div className={'text-secondary flex items-center gap-2'}>
              <Share color={'currentColor'} size={'xs'} />
              <span>Link Kopiert</span>
            </div>
          }
          animationDuration={2000}
        >
          <div className={'text-secondary flex items-center gap-2'}>
            <Share color={'currentColor'} size={'xs'} />
            <span>Link Kopieren</span>
          </div>
        </TimedButton>
      </div>
    </div>
  )
}
