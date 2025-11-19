import { getApi } from '@/mumble/api/getApi'

export async function PUT(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const id = await params.then(({ id }) => id)
  const api = await getApi()
  return api.posts.likesControllerLike(id, {})
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const id = await params.then(({ id }) => id)
  const api = await getApi()
  return await api.posts.postsControllerDelete(id, {})
}
