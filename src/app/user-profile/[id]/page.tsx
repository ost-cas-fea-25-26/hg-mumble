import { getTranslations } from 'next-intl/server'
import React from 'react'
import { getAccessToken } from '@/lib/auth'

export default async function UserProfile({ params }: { params?: Promise<{ id: string }> }) {
  const translate = await getTranslations('general')

  const userId = await params?.then(({ id }) => id)
  const { accessToken } = (await getAccessToken()) || {}
  const user = await fetch(`${process.env.API_URL}/users/me`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  }).then((res) => res.json())

  return (
    <section className={'flex h-screen items-center justify-center bg-white'}>
      <div className={'mb-24 flex h-fit w-fit flex-col items-center justify-start gap-2 rounded-md bg-white p-6'}>
        <h1 className={'text-primary text-2xl font-bold'}>Sample User Page</h1>
        <div>{userId}</div>
      </div>
    </section>
  )
}
