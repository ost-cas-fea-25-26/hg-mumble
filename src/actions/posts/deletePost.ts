'use server'

import { getMumbleApi } from '@/actions/getMumbleApi'

export async function deletePost(id?: string) {
  const api = await getMumbleApi()
  if (!id) return undefined
  const data = await api.posts.postsDelete(id, {})
  if (data.status !== 204) {
    throw new Error('Failed to delete post')
  } else return true
}
