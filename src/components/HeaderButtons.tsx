'use client'

import UserSettingsModal from '@/components/UserSettingsModal'
import { signOut, useSession } from '@/lib/auth-client'
import { Button, Logout, Settings } from 'hg-storybook'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useTranslations } from 'use-intl'

export default function HeaderButtons() {
  const [showModal, setShowModal] = React.useState(false)
  const { data: sessionData } = useSession()
  const router = useRouter()
  const t = useTranslations('general')

  return (
    <>
      {showModal && <UserSettingsModal close={() => setShowModal(false)} />}
      <Button onClick={() => setShowModal(true)} aria-label={'settings'} variant={'primary'}>
        <div className="flex items-center flex-col gap-1">
          <Settings size="xs" color={'white'} />
          <span className="text-xs">{t('settings')}</span>
        </div>
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
          <div className="flex items-center flex-col gap-1">
            <Logout size="xs" color={'white'} />
            <span className="text-xs">{t('logout')}</span>
          </div>
        </Button>
      )}
    </>
  )
}
