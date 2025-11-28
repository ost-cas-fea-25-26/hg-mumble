import { getMumbleApi } from '@/methods/data/getMumbleApi'
import { MumblePostCreateRequest } from '@/types'

export async function GET() {
  const api = await getMumbleApi()
  return await api.posts.postsControllerList({}, {})
}
