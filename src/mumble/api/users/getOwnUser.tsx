'use server'
import { auth, getAccessToken } from '@/lib/auth'
import { headers } from 'next/headers'

export type MumbleUser = {
  id: string
  userName: string
  firstName: string
  lastName: string
  avatarUrl: string
}
function authHeader(accessToken?: string): HeadersInit {
  return accessToken ? { Authorization: `Bearer ${accessToken}` } : {}
}

export async function getOwnUser(): Promise<MumbleUser> {
  const accessToken = await getAccessToken()
  const res = await fetch(`${process.env.API_URL}/users/me`, {
    headers: {
      ...authHeader(accessToken?.accessToken),
    },
  })
  const u = await res.json()
  return u
}
