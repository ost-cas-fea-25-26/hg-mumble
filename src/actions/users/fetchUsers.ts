'use server'

import { getMumbleApi } from '@/actions/getMumbleApi'

type RequestParams = {
  offset?: number
  limit?: number
}

export async function fetchUsers(params: RequestParams = { offset: 0, limit: 0 }) {
  const api = await getMumbleApi()
  const response = await api.users.usersList(params)
  return response.json()
}
