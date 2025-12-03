'use server'

import { getMumbleApi } from '@/actions/getMumbleApi'
import { PostPaginatedResult } from '@/mumble/api/generated/MumbleApi'

type RequestParams = {
  newerThan?: string
  olderThan?: string
  limit?: number
}

export async function fetchPosts(params: RequestParams = {}) {
  const api = await getMumbleApi()
  const response = await api.posts.postsList(params)
  return (await response.json()) as PostPaginatedResult
}
