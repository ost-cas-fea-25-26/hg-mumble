'use server'

import { getMumbleApi } from '@/actions/getMumbleApi'
import { getSession } from '@/lib/auth'

export async function updateAvatar(media: File) {
  const api = await getMumbleApi()
  const session = await getSession()
  if (!session) return
  const response = await api.users.avatarUpdate({ media })
  return response.status
}
