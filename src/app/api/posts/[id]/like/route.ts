import { authHeader, getAccessToken } from '@/lib/auth'
import { Api } from '@/mumble/api/generated/Api'

export async function PUT(
  _: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { accessToken } = (await getAccessToken()) || {}
  if (!accessToken) return
  const id = await params.then(({ id }) => id)
  const res = await new Api().posts.likesControllerLike(id, {
    baseUrl: process.env.API_URL,
    headers: {
      ...(await authHeader()),
    },
  })
  return Response.json({ id, status: res.status })
}
