'use server'
import { getMumbleApi } from '@/actions/getMumbleApi'

export async function addLike(id: string) {
  const api = await getMumbleApi()
  const result = await api.posts.likesUpdate(id, {})
  console.log(result)
  return result.status
}
