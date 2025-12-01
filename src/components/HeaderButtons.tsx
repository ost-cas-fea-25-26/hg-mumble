'use client'

import { Button, Logout, Settings } from 'hg-storybook'
import React from 'react'
import { authClient, useSession } from '@/lib/auth-client'

export default function HeaderButtons() {
  const { data: sessionData } = useSession()
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
            authClient.signOut()
          }}
        >
          <Logout size="xs" color={'white'} />
        </Button>
      )}
    </>
  )
}
