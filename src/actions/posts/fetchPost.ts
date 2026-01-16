'use server'

import { getMumbleApi } from '@/actions/getMumbleApi'

export async function fetchPost(id: string) {
  try {
    const api = await getMumbleApi()
    const response = await api.posts.postsDetail(id)
    return response.json()
  } catch {
    return null
  }
}
