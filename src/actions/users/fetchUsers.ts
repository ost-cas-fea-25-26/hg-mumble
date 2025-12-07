'use server'

import { getMumbleApi } from '@/actions/getMumbleApi'

export async function fetchUsers() {
  const api = await getMumbleApi()
  const response = await api.users.usersList()
  return response.json()
}
