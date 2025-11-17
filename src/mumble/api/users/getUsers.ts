'use server'
import { authHeader, getAccessToken } from '@/lib/auth'
import { Api } from '@/mumble/api/generated/Api'

export type MumbleUser = {
  id: string
  userName: string
  firstName: string
  lastName: string
  avatarUrl: string
}

export async function getUsers(): Promise<MumbleUser> {
  const res = await new Api().users.usersControllerList(
    {},
    {
      baseUrl: process.env.API_URL,
      headers: {
        ...(await authHeader()),
      },
    },
  )
  return await res.json()
}
