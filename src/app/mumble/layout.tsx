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
      <section className={'bg-secondary-100 flex items-center justify-center'}>
        <div
          className={
            'desktop:max-w-[680px]! desktop:pr-0 desktop:pl-0 flex h-fit min-h-screen w-full max-w-full flex-col items-center justify-center gap-2 rounded-md pr-4 pl-7'
          }
        >
          {children}
        </div>
      </section>
    </>
  )
}
