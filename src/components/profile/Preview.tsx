'use client'

import { followUser } from '@/actions/users/followers/addFollow'
import { User } from '@/mumble/api/generated/MumbleApi'
import { getAvatarInitials } from '@/utils/getAvatarInitials'
import { Avatar, Button, Link, Mumble, Profile } from 'hg-storybook'
import { useState } from 'react'
import { toast } from 'sonner'
import { useTranslations } from 'use-intl'

interface Props {
  user: User
  onFollowSuccess: () => void
}

export default function ProfilePreview({ user, onFollowSuccess }: Props) {
  const t = useTranslations('recommendations')
  const [isLoading, setIsLoading] = useState(false)

  const avatarPlaceholderText = getAvatarInitials(
    user.displayName || `${user.firstname} ${user.lastname}` || user.username
  )

  const handleFollow = async () => {
    setIsLoading(true)

    try {
      const status = await followUser(user.id as string)

      if (status === 204 || status === 200) {
        toast.success(t('followed-success', { name: user.firstname }), {
          description: `@${user.username}`,
          duration: 2000,
        })

        await new Promise((r) => setTimeout(r, 1000))

        onFollowSuccess()
      } else {
        toast.error(t('follow-error'))
      }
    } catch (error) {
      console.error(error)
      toast.error(t('unexpected-error'))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm h-full justify-between transition-all duration-500">
      <div className="flex flex-col items-center w-full">
        <Avatar src={user.avatarUrl || undefined} placeholderText={avatarPlaceholderText} size={'l'} />

        <h3 className="text-lg font-bold truncate text-nowrap mt-2 max-w-full">
          {user.firstname} {user.lastname}
        </h3>

        <div className="flex flex-col gap-2 mb-4">
          <Link
            url={`/mumble/profile/${user.id}`}
            className={'text-primary flex items-center justify-start gap-1 font-bold'}
          >
            <Profile color={'currentColor'} className="h-3 w-3" />
            <span className="text-sm">{user.username}</span>
          </Link>
        </div>
      </div>

      <div className="w-full mt-4">
        <Button width={'w-full'} variant={'primary'} size={'medium'} onClick={handleFollow} disabled={isLoading}>
          {isLoading ? t('following') : t('follow')}
          <Mumble color="white" className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </div>
  )
}
