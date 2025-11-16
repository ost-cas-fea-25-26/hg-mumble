'use client'
import React from 'react'
import { Button, Mumble } from 'hg-storybook'
import { signIn } from '@/lib/auth-client'
import { useTranslations } from 'use-intl'

export default function Login() {
  const translate = useTranslations('general')
  return (
    <section className={'bg-primary flex items-center justify-center'}>
      <div
        className={
          'mb-24 flex h-fit w-fit flex-col items-center justify-start gap-2 rounded-md bg-white p-6'
        }
      >
        <Mumble className={'text-primary'} />
        <h1 className={'text-primary text-2xl font-bold'}>
          {translate('login-title')}
        </h1>
        <Button variant={'primary'} onClick={() => signIn()}>
          {translate('login')}
        </Button>
      </div>
    </section>
  )
}
