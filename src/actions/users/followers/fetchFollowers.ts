'use server'

import { getMumbleApi } from '@/actions/getMumbleApi'

type RequestParams = {
  offset?: number
  limit?: number
}

export async function fetchFollowers(id: string, params: RequestParams = {}) {
  const api = await getMumbleApi()

  const response = await api.users.followersList(id, params)

  return response.json()
}
