import { User } from '@/mumble/api/generated/MumbleApi'
import clsx from 'clsx'
import { Avatar, Mumble, Profile } from 'hg-storybook'
type Props = {
  user: User // Better type safety than 'any'
  stats?: {
    followers: number
  }
  children?: React.ReactNode // Slot for the ProfileFollow button
}

export default function ProfileHeader({ user, stats, children }: Props) {
  const displayName = user.firstname && user.lastname ? `${user.firstname} ${user.lastname}` : user.username

  return (
    <div className="mb-6 flex flex-col items-center justify-center gap-5">
      <div className="relative w-full">
        <img src={'https://unsplash.it/1920/1080?random'} className="h-80 w-full rounded-md object-cover" alt="Cover" />
        <div className="absolute right-6 -bottom-16.5">
          <Avatar src={user.avatarUrl ?? undefined} size={'xl'} editButton={false} />
        </div>
      </div>

      <div className="flex w-full flex-col gap-2">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h1 className={clsx('text-3xl font-bold text-slate-900')}>{displayName}</h1>

          {children && <div className="mt-2 md:mt-0">{children}</div>}
        </div>

        <div className="flex flex-row flex-wrap gap-4">
          <div className={'text-primary flex items-center justify-start gap-1 font-bold'}>
            <Profile color={'currentColor'} size={'xs'} />
            <span>{user.username}</span>
          </div>

          {stats && (
            <div className={'flex items-center justify-start gap-1 font-bold text-slate-400'}>
              <Mumble className="text-slate-400" size={'xs'} />
              <span>{stats.followers} Followers</span>
            </div>
          )}
        </div>

        <div>
          <p className="max-w-2xl font-medium text-slate-400">{user.bio || 'No bio provided yet.'}</p>
        </div>
      </div>
    </div>
  )
}
