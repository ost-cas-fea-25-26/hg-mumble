import { authHeader } from '@/lib/auth'
import { Api } from '@/mumble/api'

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const id = await params.then(({ id }) => id)
  return await new Api().users.usersControllerGetById(id, {
    baseUrl: process.env.API_URL,
    headers: {
      ...(await authHeader()),
    },
  })
}
