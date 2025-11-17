'use server'
import { auth, authHeader, getAccessToken } from '@/lib/auth'
import { headers } from 'next/headers'

export type MumbleUser = {
  id: string
  userName: string
  firstName: string
  lastName: string
  avatarUrl: string
}

export async function getOwnUser(): Promise<MumbleUser> {
  const res = await fetch(`${process.env.API_URL}/users/me`, {
    headers: { ...(await authHeader()) },
  })
  return await res.json()
}
