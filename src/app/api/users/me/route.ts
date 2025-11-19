import { getApi } from '@/mumble/api/getApi'

export async function GET(_: Request) {
  const api = await getApi()
  return await api.users.usersControllerMe({})
}
