import { MumblePostCreateRequest } from '@/common/types'
import { getApi } from '@/mumble/api/getApi'

export async function GET() {
  const api = await getApi()
  return await api.posts.postsControllerList({}, {})
}

export async function POST() {
  //todo
  const data: MumblePostCreateRequest = {}
  const api = await getApi()
  return await api.posts.postsControllerCreate(data)
}
