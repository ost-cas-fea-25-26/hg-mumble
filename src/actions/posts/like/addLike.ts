'use server'
import { getMumbleApi } from '@/actions/getMumbleApi'

export async function addLike(id: string) {
  console.log(id)
  const api = await getMumbleApi()
  return api.posts.likesUpdate(id, {})
}
