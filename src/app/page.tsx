import { Loader } from 'hg-storybook'
import { redirect } from 'next/navigation'
import React from 'react'
import { getSession } from '@/lib/auth'

export default async function Page() {
  const session = await getSession()

  if (session?.user?.id !== null) {
    redirect('/mumble/')
  } else {
    redirect('/auth/signin')
  }

  return (
    <div className={'flex h-full w-full items-center justify-center'}>
      <Loader color={'primary'} size={'large'} />
    </div>
  )
}
