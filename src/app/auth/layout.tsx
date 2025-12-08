import LoginAside from '@/components/LoginAside'
import 'hg-storybook/style'
import React, { ReactNode } from 'react'
import '../globals.css'

type Props = {
  children: ReactNode
}

export default async function AuthLayout({ children }: Props) {
  return (
    <section
      className={
        'desktop:flex-row flex h-full w-full flex-col items-center justify-around bg-linear-(--gradient-80-40)'
      }
    >
      <div className={'desktop:h-full h-fit w-1/2 p-4'}>
        <LoginAside />
      </div>
      <div className={'desktop:w-1/2 h-full w-full p-4'}>
        <div className={'flex h-full items-center justify-center rounded-md bg-white'}>
          <div className="flex flex-col items-center justify-center">{children}</div>
        </div>
      </div>
    </section>
  )
}
