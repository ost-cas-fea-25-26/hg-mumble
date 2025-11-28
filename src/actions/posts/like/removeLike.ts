'use server'
import { getMumbleApi } from '@/actions/getMumbleApi'

export async function removeLike(id: string) {
  const api = await getMumbleApi()
  return api.posts.likesDelete(id, {})
}
