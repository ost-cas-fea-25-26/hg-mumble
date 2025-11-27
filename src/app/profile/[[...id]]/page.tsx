'use client'

import useApi from '@/hooks/data/useApi'
import { fetchUser } from '@/methods/data/users/fetchUser'
import { MumbleUser } from '@/types'
import clsx from 'clsx'
import { Avatar, Loader } from 'hg-storybook'
import { useParams } from 'next/navigation'
import React from 'react'
import { useTranslations } from 'use-intl'

export default function UserProfile() {
  const translate = useTranslations('general')

  const params = useParams()
  const profileId = params.id?.[0]
  const apiUrl = profileId ? `/api/users/${profileId}` : '/api/users/me'

  const { data: user, isLoading, error: swrError } = useApi<MumbleUser>(apiUrl, new URLSearchParams(), fetchUser)

  if (isLoading || (!user && !swrError)) {
    return (
      <div className={'flex h-full min-h-screen flex-col items-center justify-center bg-white'}>
        <Loader size={'large'} color={'primary'} />
      </div>
    )
  }

  console.log(swrError)

  if (!user || swrError) {
    return (
      <section className={clsx('flex h-screen items-center justify-center bg-white')}>
        <div
          className={clsx('mb-24 flex h-fit w-fit flex-col items-center justify-start gap-2 rounded-md bg-white p-6')}
        >
          <h1 className={clsx('text-2xl font-bold text-red-700')}>Error</h1>
        </div>
      </section>
    )
  }

  const displayName =
    user.firstName && user.lastName ? `${user.firstName} ${user.lastName}` : user.userName || translate('profile-title')

  return (
    <section className={clsx('flex h-screen items-center justify-center bg-white')}>
      <div
        className={clsx(
          'mb-24 flex h-fit w-fit min-w-80 flex-col items-center justify-start gap-4 rounded-md bg-white p-8 shadow-lg'
        )}
      >
        <Avatar src={user.avatarUrl} size={'xl'} />
        <h1 className={clsx('text-primary text-3xl font-bold')}>{displayName}</h1>

        <div className={clsx('flex flex-col items-center justify-center gap-1')}>
          <p className={clsx('text-secondary-900 text-xl font-semibold')}>{user.userName}</p>
          {user.firstName && user.lastName && (
            <p className={clsx('text-secondary-700 text-lg')}>
              {user.firstName} {user.lastName}
            </p>
          )}
          <p className={clsx('text-secondary-500 text-sm')}>
            {translate('user-id')}: {user.id}
          </p>
        </div>

        <p className={clsx('text-secondary-400 mt-4 italic')}>{translate('posts-will-be-displayed-here')}</p>
      </div>
    </section>
  )
}
