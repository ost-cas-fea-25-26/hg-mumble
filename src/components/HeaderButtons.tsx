'use client'

import { Button, Logout, Settings } from 'hg-storybook'
import { useRouter } from 'next/navigation'
import React from 'react'
import { authClient, signOut, useSession } from '@/lib/auth-client'

export default function HeaderButtons() {
  const { data: sessionData } = useSession()
  const router = useRouter()
  return (
    <>
      <Button aria-label={'settings'} variant={'primary'}>
        <Settings size="xs" color={'white'} />
      </Button>
      {sessionData && (
        <Button
          aria-label={'logout'}
          variant={'primary'}
          onClick={() => {
            authClient.revokeSessions()
            signOut().then(() => {
              router.push('/')
            })
          }}
        >
          <Logout size="xs" color={'white'} />
        </Button>
      )}
    </>
  )
}
