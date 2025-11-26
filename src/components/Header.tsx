'use client'
import { fetchOwnUser } from '@/methods/data/users/fetchOwnUser'
import { Avatar, Button, Link, Logout, Mumble, Settings } from 'hg-storybook'
import React from 'react'
import useSWR from 'swr'
import { useTranslations } from 'use-intl'
import { useSession } from '@/lib/auth-client'

type Props = {}

export default function Header({}: Props) {
  const { data: userData } = useSWR('api/users/me', fetchOwnUser)

  const { data: sessionData } = useSession() || {}
  const translate = useTranslations('general')
  return (
    <header className={'bg-primary flex h-20 items-center justify-around text-white'}>
      <div className={'flex items-center justify-between gap-2'}>
        <Mumble size={'s'} color={'white'} />
        <h1 className={'text-l desktop:text-xl font-bold'}>Mumble</h1>
      </div>
      {!sessionData && (
        <Link className={'text-white'} url={'/signin'}>
          {translate('login')}
        </Link>
      )}
      <div className={'flex items-center justify-between gap-2'}>
        {userData && <Avatar size={'s'} src={userData.avatarUrl} />}
        <Button aria-label={'settings'} variant={'primary'}>
          <Settings size="xs" color={'white'} />
        </Button>
        {sessionData && (
          <Button aria-label={'logout'} variant={'primary'}>
            <Logout size="xs" color={'white'} />
          </Button>
        )}
      </div>
    </header>
  )
}
