import { authHeader } from '@/lib/auth'
import { Api } from '@/mumble/api'

export async function GET(_: Request) {
  return await new Api().users.usersControllerMe({
    baseUrl: process.env.API_URL,
    headers: {
      ...(await authHeader()),
    },
  })
}
