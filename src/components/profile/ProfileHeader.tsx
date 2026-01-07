'use client'
import { updateAvatar } from '@/actions/users/updateAvatar'
import { updateAvatar as updateAvatarZitadel } from '@/actions/zitadel/updateAvatar'
import { useSession } from '@/lib/auth-client'
import clsx from 'clsx'
import { Avatar, Button, Calendar, FileInput, Location, Modal, Profile } from 'hg-storybook'
import { useState } from 'react'
import { toast } from 'sonner'
import { useTranslations } from 'use-intl'

type Props = {
  user: any
}

export default function ProfileHeader({ user }: Props) {
  const displayName = user.firstname && user.lastname ? `${user.firstname} ${user.lastname}` : user.username
  const { data: sessionData } = useSession()
  const [showEditModal, setShowEditModal] = useState(false)
  const translate = useTranslations()

  const [avatar, setAvatar] = useState<File | null>(null)
  const saveAvatar = () => {
    if (avatar)
      Promise.allSettled([updateAvatarZitadel(avatar), updateAvatar(avatar)]).then(([res1, res2]) => {
        setShowEditModal(false)
        if ([res1.status, res2.status].every((s) => s === 'fulfilled')) {
          return toast.success(translate('profile.edit-avatar-success'))
        }
        return toast.error(translate('profile.edit-avatar-error'))
      })
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
        <div className="relative w-full">
          <img
            src={'https://unsplash.it/1920/1080?random'}
            className="h-80 w-full rounded-md object-cover"
            alt="Cover"
          />
          <div className="absolute right-6 -bottom-16.5">
            <Avatar
              src={user.avatarUrl ?? undefined}
              size={'xl'}
              editButton={sessionData?.user?.sub === user.id}
              onEdit={() => setShowEditModal(true)}
              editAriaLabel={translate('profile.edit-avatar')}
            />
          </div>
        </div>

        <div className="flex w-full flex-col gap-2">
          <h1 className={clsx('text-3xl font-bold text-slate-900')}>{displayName}</h1>

          <div className="flex flex-row gap-4">
            <div className={'text-primary flex items-center justify-start gap-1 font-bold'}>
              <Profile color={'currentColor'} size={'xs'} />
              <span>{user.username}</span>
            </div>

            <div className={'flex items-center justify-start gap-1 font-bold text-slate-400'}>
              <Location color={'slate-400'} size={'xs'} />
              <span>Location</span>
            </div>

            <div className={'flex items-center justify-start gap-1 font-bold text-slate-400'}>
              <Calendar color={'slate-400'} size={'xs'} />
              <span>Mumbler since 1994</span>
            </div>
          </div>

          <div>
            <p className="max-w-2xl font-medium text-slate-400">{user.bio || 'No bio provided yet.'}</p>
          </div>
        </div>
      </div>
    </>
  )
}
