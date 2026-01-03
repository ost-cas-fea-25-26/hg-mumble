'use server'

import { getMumbleApi } from '@/actions/getMumbleApi'

type RequestParams = {
  offset?: number
  limit?: number
}

export async function fetchFollowees(id: string, params: RequestParams = {}) {
  const api = await getMumbleApi()

  const response = await api.users.followeesList(id, params)

  return response.json()
}
