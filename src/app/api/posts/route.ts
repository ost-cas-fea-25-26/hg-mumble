import { MumblePostCreateRequest } from '@/common/types'
import { getMumbleApi } from '@/mumble/api/getMumbleApi'

export async function GET() {
  const api = await getMumbleApi()
  return await api.posts.postsControllerList({}, {})
}

export async function POST() {
  //todo
  const data: MumblePostCreateRequest = {}
  const api = await getMumbleApi()
  return await api.posts.postsControllerCreate(data)
}
