import { MumbleCommentCreateRequest } from '@/common/types/MumbleApi.types'
import { authHeader } from '@/lib/auth'
import { Api } from '@/mumble/api'

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const data = (await req.json()) as MumbleCommentCreateRequest
  const id = await params.then(({ id }) => id)
  return await new Api().posts.postsControllerReply(id, data, {
    baseUrl: process.env.API_URL,
    headers: {
      ...(await authHeader()),
    },
  })
}

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const id = await params.then(({ id }) => id)
  return await new Api().posts.postsControllerReplies(id, {
    baseUrl: process.env.API_URL,
  })
}
