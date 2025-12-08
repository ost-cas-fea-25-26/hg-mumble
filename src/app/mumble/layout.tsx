import Header from '@/components/Header'
import 'hg-storybook/style'
import React, { ReactNode } from 'react'
import '../globals.css'

type Props = {
  children: ReactNode
}

export default async function MumbleLayout({ children }: Props) {
  return (
    <>
      <Header />
      <section className={'flex items-center justify-center bg-blue-100'}>
        <div
          className={
            'desktop:max-w-[680px]! flex h-fit min-h-screen w-full max-w-full flex-col items-center justify-center gap-2 rounded-md'
          }
        >
          {children}
        </div>
      </section>
    </>
  )
}
