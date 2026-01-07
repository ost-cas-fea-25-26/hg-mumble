'use client'

import { updateAvatar } from '@/actions/users/updateAvatar'
import { updateAvatar as updateAvatarZitadel } from '@/actions/zitadel/updateAvatar'
import { useSession } from '@/lib/auth-client'
import { User } from '@/mumble/api/generated/MumbleApi'
import { getAvatarInitials } from '@/utils/getAvatarInitials'
import clsx from 'clsx'
import { Avatar, Button, FileInput, Modal, Mumble, Profile } from 'hg-storybook'
import Image from 'next/image'
import { useState } from 'react'
import { toast } from 'sonner'
import { useTranslations } from 'use-intl'

type Props = {
  user: User
  stats?: {
    followers: number
  }
  children?: React.ReactNode
}

export default function ProfileHeader({ user, stats, children }: Props) {
  const t = useTranslations('general')
  const translate = useTranslations()
  const { data: sessionData } = useSession()

  const [isImageLoaded, setIsImageLoaded] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [avatar, setAvatar] = useState<File | null>(null)

  const avatarPlaceholderText = getAvatarInitials(user.firstname + ' ' + user.lastname)
  const displayName = user.firstname && user.lastname ? `${user.firstname} ${user.lastname}` : user.username
  const coverImageUrl = `https://unsplash.it/1920/1080?random&seed=${user.id}`
  const isOwnProfile = sessionData?.user?.sub === user.id

  const saveAvatar = () => {
    if (avatar) {
      Promise.allSettled([updateAvatarZitadel(avatar), updateAvatar(avatar)]).then(([res1, res2]) => {
        setShowEditModal(false)
        if ([res1.status, res2.status].every((s) => s === 'fulfilled')) {
          return toast.success(translate('profile.edit-avatar-success'))
        }
        return toast.error(translate('profile.edit-avatar-error'))
      })
    }
  }

  return (
    <>
      {showEditModal && (
        <Modal title={translate('profile.edit-avatar')} onClose={() => setShowEditModal(false)}>
          <div className={clsx('flex flex-col gap-4')}>
            <FileInput
              label={translate('profile.edit-avatar')}
              description={translate('mumble-post.file-input-accepted-images')}
              size={'small'}
              files={[avatar].filter(Boolean) as File[]}
              onDrop={([file]) => {
                setAvatar(file)
              }}
              setFiles={([file]) => {
                setAvatar(file)
              }}
            />
            <Button onClick={saveAvatar} variant={'primary'} width={'w-full'}>
              {translate('general.save')}
            </Button>
          </div>
        </Modal>
      )}

      <div className="mb-6 flex flex-col items-center justify-center gap-5">
        <div className="relative h-80 w-full rounded-md bg-slate-200">
          <Image
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
          <div className="absolute right-6 -bottom-16.5">
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
                <Mumble size={'xs'} className="text-slate-400" />
                <span>{t('followers', { count: stats.followers })}</span>
              </div>
            )}
          </div>

          <div>
            <p className="max-w-2xl font-medium text-slate-400">{sessionData?.user?.bio || t('no-bio')}</p>
          </div>
        </div>
      </div>
    </>
  )
}
