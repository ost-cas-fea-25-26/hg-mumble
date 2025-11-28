import { getMumbleApi } from '@/actions/getMumbleApi'

export async function addLike(id: string) {
  const api = await getMumbleApi()
  return api.posts.likesUpdate(id, {})
}
