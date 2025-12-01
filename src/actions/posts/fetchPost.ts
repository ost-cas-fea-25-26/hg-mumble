'use server'

import { getMumbleApi } from '@/actions/getMumbleApi'
import { Post } from '@/mumble/api/generated/MumbleApi'

export async function fetchPost(id: string) {
  const api = await getMumbleApi()
  return (await api.posts.postsDetail(id)).data as Post
}
