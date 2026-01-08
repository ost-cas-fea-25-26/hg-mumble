'use server'

import { getMumbleApi } from '@/actions/getMumbleApi'

export async function unfollowUser(id: string) {
  try {
    const api = await getMumbleApi()
    const response = await api.users.followersDelete(id)

    return (response as any)?.status || 204
  } catch (error) {
    console.error('Failed to unfollow user:', error)
    return 500
  }
}
