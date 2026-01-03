'use server'

import { getMumbleApi } from '@/actions/getMumbleApi'

export async function followUser(id: string) {
  try {
    const api = await getMumbleApi()
    const response = await api.users.followersUpdate(id)

    return (response as any)?.status || 204
  } catch (error) {
    console.error('Failed to follow user:', error)
    return 500
  }
}
