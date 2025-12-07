'use server'

import { getMumbleApi } from '@/actions/getMumbleApi'

export async function fetchUser(id: string) {
  const api = await getMumbleApi()
  return await api.users.usersDetail(id).then((res) => res.json())
}
