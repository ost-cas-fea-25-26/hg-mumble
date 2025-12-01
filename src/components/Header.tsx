import HeaderTitle from '@/components/HeaderTitle'
import HeaderUserDetails from '@/components/HeaderUserDetails'
import React from 'react'

type Props = {}

export default async function Header({}: Props) {
  return (
    <header className={'bg-primary flex h-20 items-center justify-around text-white'}>
      <HeaderTitle />
      <HeaderUserDetails />
    </header>
  )
}
