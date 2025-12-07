import HeaderTitle from '@/components/HeaderTitle'
import HeaderUserDetails from '@/components/HeaderUserDetails'
import React from 'react'
import { getSession } from '@/lib/auth'

export default async function Header() {
  const sessionData = await getSession()

  return (
    <header className={'bg-primary flex h-20 items-center justify-around text-white'}>
      <HeaderTitle />
      {sessionData && <HeaderUserDetails />}
    </header>
  )
}
