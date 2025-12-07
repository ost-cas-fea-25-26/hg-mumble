'use server'
import { getMumbleApi } from '@/actions/getMumbleApi'

export async function removeLike(id: string) {
  const api = await getMumbleApi()
  const response = await api.posts.likesDelete(id, {})
  return response.status
}
