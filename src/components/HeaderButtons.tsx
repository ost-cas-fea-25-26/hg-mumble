'use client'

import { updateUser } from '@/actions/zitadel/updateUser'
import UserSettingsModal from '@/components/UserSettingsModal'
import { FormValues } from '@/interfaces/MumbleFormValues'
import { Button, Input, Logout, Modal, Settings } from 'hg-storybook'
import { useRouter } from 'next/navigation'
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { authClient, signOut, useSession } from '@/lib/auth-client'

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
