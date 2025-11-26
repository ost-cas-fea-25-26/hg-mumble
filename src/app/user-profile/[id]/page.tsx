import ProfileHeader from '@/components/profile/ProfileHeader'
import { getTranslations } from 'next-intl/server'
import React from 'react'
import { getAccessToken } from '@/lib/auth'

interface Props {
  params?: Promise<{
    id: string
  }>
}

export default async function UserProfile({ params }: Props) {
  const userId = (await params)?.id

  const { accessToken } = (await getAccessToken()) || {}
  const user = await fetch(`${process.env.API_URL}/users/me`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  }).then((res) => res.json())

  return (
    <section className={'flex h-screen items-center justify-center bg-white'}>
      <ProfileHeader user={user} />

      <div>{JSON.stringify(user)}</div>
    </section>
  )
}
