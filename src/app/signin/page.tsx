'use client'
import React from 'react'
import { Button, Mumble } from 'hg-storybook'
import { signIn } from '@/lib/auth-client'

export default function Login() {
  return (
    <section className={'bg-primary flex items-center justify-center'}>
      <div
        className={
          'mb-24 flex h-fit w-fit flex-col items-center justify-start gap-2 rounded-md bg-white p-6'
        }
      >
        <Mumble className={'text-primary'} />
        <h1 className={'text-primary text-2xl font-bold'}>Login</h1>
        <Button variant={'primary'} onClick={() => signIn()}>
          Let's gooo!!!
        </Button>
      </div>
    </section>
  )
}
