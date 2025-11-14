'use client'
import React from 'react'
import { Avatar, Button, Logout, Mumble, Settings } from 'hg-storybook'

type Props = {}

export default function Header({}: Props) {
  return (
    <header
      className={'bg-primary flex h-20 items-center justify-around text-white'}
    >
      <div className={'flex items-center justify-between gap-2'}>
        <Mumble size={'s'} color={'white'} />
        <h1 className={'text-l desktop:text-xl font-bold'}>Mumble</h1>
      </div>
      <div className={'flex items-center justify-between gap-2'}>
        <Avatar size={'small'} src={'avatar.png'} />
        <Button aria-label={'logout'} variant={'primary'}>
          <Settings size="xs" color={'white'}></Settings>
        </Button>
        <Button aria-label={'logout'} variant={'primary'}>
          <Logout size="xs" color={'white'}></Logout>
        </Button>
      </div>
    </header>
  )
}
