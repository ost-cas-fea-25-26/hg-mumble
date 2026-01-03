'use server'

import { getMumbleApi } from '@/actions/getMumbleApi'
import { getSession } from '@/lib/auth'

export async function updateUser(firstname: string, lastname: string) {
  const api = await getMumbleApi()
  const session = await getSession()
  if (!session) return
  const response = await api.users.usersPartialUpdate({ firstname, lastname, username: session.user.name })
  return response.status
}
