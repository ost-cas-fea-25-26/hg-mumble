import { MumbleCommentCreateRequest } from '@/common/types'
import { getMumbleApi } from '@/mumble/api/getMumbleApi'

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const data = (await req.json()) as MumbleCommentCreateRequest
  const id = await params.then(({ id }) => id)
  const api = await getMumbleApi()
  return await api.posts.postsControllerReply(id, data, {})
}

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const id = await params.then(({ id }) => id)
  const api = await getMumbleApi()
  return await api.posts.postsControllerReplies(id, {})
}
