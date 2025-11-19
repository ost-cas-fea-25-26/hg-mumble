import { getMumbleApi } from '@/methods/data/getMumbleApi'

export async function PUT(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const id = await params.then(({ id }) => id)
  const api = await getMumbleApi()
  return api.posts.likesControllerLike(id, {})
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const id = await params.then(({ id }) => id)
  const api = await getMumbleApi()
  return await api.posts.postsControllerDelete(id, {})
}
