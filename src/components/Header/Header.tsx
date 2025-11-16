'use client'
import React from 'react'
import { Avatar, Button, Link, Logout, Mumble, Settings } from 'hg-storybook'
import { authClient, signIn, useSession } from '@/lib/auth-client'
import useSWR from 'swr'
import { getOwnUser } from '@/mumble/api/users/getOwnUser'

type Props = {}

export default function Header({}: Props) {
  const { data: sessionData } = useSession()
  const { data: userData, error } = useSWR('user', getOwnUser)
  async function updateUser(id: string, userData: any): Promise<Response> {
    const formData = new FormData()
    formData.append('id', id)
    formData.append('firstName', 'Patrick')
    formData.append('lastName', 'Brunner2')
    formData.append('displayName', 'updatedVerac')
    return await fetch(`/api/users/me/profile/`, {
      method: 'PATCH',
      body: formData,
    })
  }

  return (
    <header
      className={'bg-primary flex h-20 items-center justify-around text-white'}
    >
      <Link url={'/home'}>
        <h1 className={'text-l desktop:text-xl inline font-bold'}>
          <Mumble size={'s'} color={'white'} />
          <span>Mumble</span>
        </h1>
      </Link>
      <div className={'flex items-center justify-between gap-2'}>
        {sessionData?.user ? (
          `${sessionData?.user.name}`
        ) : (
          <Button variant={'primary'} onClick={signIn}>
            Login
          </Button>
        )}

        {sessionData && userData && (
          <>
            <Avatar size={'s'} src={userData?.avatarUrl} />
            <Button aria-label={'change user settings'} variant={'primary'}>
              <Settings size="xs" color={'white'}></Settings>
            </Button>
            <Button
              variant={'secondary'}
              onClick={() => {
                updateUser(userData?.id, {
                  preferredLanguage: 'de',
                }).then(console.log)
              }}
            >
              set user
            </Button>
            <Button
              aria-label={'logout'}
              variant={'primary'}
              onClick={async () => {
                await authClient.revokeSessions()
                await authClient.signOut()
              }}
            >
              <Logout size="xs" color={'white'}></Logout>
            </Button>
          </>
        )}
      </div>
    </header>
  )
}
