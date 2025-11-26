import { getMumbleApi } from '@/methods/data/getMumbleApi'

export async function GET(_: Request) {
  const api = await getMumbleApi()
  return await api.users.usersControllerMe({})
}
