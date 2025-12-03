'use server'

import { getMumbleApi } from '@/actions/getMumbleApi'
import { PostPaginatedResult } from '@/mumble/api/generated/MumbleApi'

export async function fetchPosts() {
  const api = await getMumbleApi()
  return await api.posts.postsList({}).then((res) => {
    return res.json() as PostPaginatedResult
  })
}
