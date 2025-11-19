import { MumbleCommentCreateRequest } from '@/common/types'
import { getApi } from '@/mumble/api/getApi'

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const data = (await req.json()) as MumbleCommentCreateRequest
  const id = await params.then(({ id }) => id)
  const api = await getApi()
  return await api.posts.postsControllerReply(id, data, {})
}

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const id = await params.then(({ id }) => id)
  const api = await getApi()
  return await api.posts.postsControllerReplies(id, {})
}
