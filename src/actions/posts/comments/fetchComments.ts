'use server'

import { getMumbleApi } from '@/actions/getMumbleApi'

export async function fetchComments(id: string) {
  const api = await getMumbleApi()
  const response = await api.posts.repliesList(id)

  return response.json()
}
