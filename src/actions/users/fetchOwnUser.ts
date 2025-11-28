import { getMumbleApiOld } from '@/actions/getMumbleApi'
import { User } from '@/mumble/api/generated/Api2'

export async function fetchOwnUser(): Promise<User> {
  const api = await getMumbleApiOld()
  return await api.users.usersControllerMe({}).then((res) => {
    return res.json()
  })
}
