import { MumblePostCreateRequest } from '@/common/types/MumbleApi.types'
import { Api } from '@/mumble/api'

export async function GET(_req: Request) {
  return await new Api().posts.postsControllerList({}, { baseUrl: process.env.API_URL })
}

export async function POST(_req: Request, _res: Response) {
  const data: MumblePostCreateRequest = {}
  return await new Api().posts.postsControllerCreate(data)
}
