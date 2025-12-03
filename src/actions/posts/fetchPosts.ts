'use server'

import { getMumbleApi } from '@/actions/getMumbleApi'
import { PostPaginatedResult } from '@/mumble/api/generated/MumbleApi'

export async function fetchPosts() {
  const api = await getMumbleApi()
  const response = await api.posts.postsList({})
  return (await response.json()) as PostPaginatedResult
}
