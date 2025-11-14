'use client'
import React from 'react'
import { Mumble } from 'hg-storybook'

export default function Feed() {
  return (
    <section className={'bg-primary flex items-center justify-center'}>
      <div
        className={
          'mb-24 flex h-fit w-fit flex-col items-center justify-center gap-2 rounded-md bg-white p-6 sm:w-1/2'
        }
      >
        <Mumble className={'text-primary'} />
        Feed (signed in)
      </div>
    </section>
  )
}
