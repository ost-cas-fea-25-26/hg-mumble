'use client'

import UserSettingsModal from '@/components/UserSettingsModal'
import { signOut, useSession } from '@/lib/auth-client'
import { Button, Logout, Settings } from 'hg-storybook'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function HeaderButtons() {
  const [showModal, setShowModal] = React.useState(false)
  const { data: sessionData } = useSession()
  const router = useRouter()

  return (
    <>
      {showModal && <UserSettingsModal close={() => setShowModal(false)} />}
      <Button onClick={() => setShowModal(true)} aria-label={'settings'} variant={'primary'}>
        <Settings size="xs" color={'white'} />
      </Button>
      {sessionData && (
        <Button
          aria-label={'logout'}
          variant={'primary'}
          onClick={() => {
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
