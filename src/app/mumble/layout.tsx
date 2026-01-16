import Header from '@/components/Header'
import { getSession } from '@/lib/auth'
import 'hg-storybook/style'
import { redirect } from 'next/navigation'
import { ReactNode } from 'react'
import '../globals.css'

type Props = {
  children: ReactNode
}

export default async function MumbleLayout({ children }: Props) {
  const sessionData = await getSession()

  if (!sessionData?.session) {
    redirect('/auth/signin')
  }

  return (
    <>
      <Header />
      <section className={'bg-secondary-100 flex items-center justify-center'}>
        <div
          className={
            'desktop:max-w-[680px]! desktop:pr-0 desktop:pl-0 flex h-fit min-h-screen w-full max-w-full flex-col items-center gap-2 rounded-md pr-4 pl-7'
          }
        >
          {children}
        </div>
      </section>
    </>
  )
}
