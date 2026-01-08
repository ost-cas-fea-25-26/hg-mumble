'use client'

import UserSettingsModal from '@/components/UserSettingsModal'
import { useSession } from '@/lib/auth-client'
import { User } from '@/mumble/api/generated/MumbleApi'
import { getAvatarInitials } from '@/utils/getAvatarInitials'
import clsx from 'clsx'
import { Avatar, Mumble, Profile } from 'hg-storybook'
import Image from 'next/image'
import { ReactNode, useState } from 'react'
import { useTranslations } from 'use-intl'

type Props = {
  user: User
  stats?: {
    followers: number
  }
  children?: ReactNode
}

export default function ProfileHeader({ user, stats, children }: Props) {
  const t = useTranslations('general')
  const translate = useTranslations()
  const { data: sessionData } = useSession()

  const [isImageLoaded, setIsImageLoaded] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const avatarPlaceholderText = getAvatarInitials(user.firstname + ' ' + user.lastname)
  const displayName = user.firstname && user.lastname ? `${user.firstname} ${user.lastname}` : user.username
  const coverImageUrl = `https://unsplash.it/1920/1080?random&seed=${user.id}`
  const isOwnProfile = sessionData?.user?.sub === user.id

  return (
    <>
      {showEditModal && <UserSettingsModal close={() => setShowEditModal(false)}></UserSettingsModal>}
      <div data-testid="profile-header" className="mb-6 flex flex-col items-center justify-center gap-5">
        <div className="relative h-80 w-full rounded-md bg-slate-200">
          <Image
            data-testid="profile-cover-image"
            src={coverImageUrl}
            alt="Cover Image"
            fill
            priority
            sizes="100vw"
            className={clsx(
              'rounded-md object-cover transition-opacity duration-700 ease-in-out',
              isImageLoaded ? 'opacity-100' : 'opacity-0'
            )}
            onLoad={() => setIsImageLoaded(true)}
          />
          <div className="absolute right-6 -bottom-16.5" data-testid="profile-avatar">
            <Avatar
              src={user.avatarUrl ?? undefined}
              size={'xl'}
              editButton={isOwnProfile}
              onEdit={() => setShowEditModal(true)}
              editAriaLabel={translate('profile.edit-avatar')}
              placeholderText={avatarPlaceholderText}
            />
          </div>
        </div>

        <div className="flex w-full flex-col gap-2">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <h1 data-testid="profile-display-name" className={clsx('text-3xl font-bold text-slate-900')}>
              {displayName}
            </h1>
            {children && <div className="mt-2 md:mt-0">{children}</div>}
          </div>

          <div className="flex flex-row flex-wrap gap-4">
            <div className={'text-primary flex items-center justify-start gap-1 font-bold'}>
              <Profile color={'currentColor'} size={'xs'} />
              <span data-testid="profile-username">{user.username}</span>
            </div>

            {stats && (
              <div className={'flex items-center justify-start gap-1 font-bold text-slate-400'}>
                <Mumble size={'xs'} className="text-slate-400" />
                <span data-testid="profile-followers-count">{t('followers', { count: stats.followers })}</span>
              </div>
            )}
          </div>

          <div>
            <p data-testid="profile-bio" className="max-w-2xl font-medium text-slate-400">
              {sessionData?.user?.bio || t('no-bio')}
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
