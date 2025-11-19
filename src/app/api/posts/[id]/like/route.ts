import { authHeader } from '@/lib/auth'
import { Api } from '@/mumble/api/generated/Api'

export async function PUT(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const id = await params.then(({ id }) => id)
  return await new Api().posts.likesControllerLike(id, {
    baseUrl: process.env.API_URL,
    headers: {
      ...(await authHeader()),
    },
  })
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const id = await params.then(({ id }) => id)
  return await new Api().posts.postsControllerDelete(id, {
    baseUrl: process.env.API_URL,
    headers: {
      ...(await authHeader()),
    },
  })
}
