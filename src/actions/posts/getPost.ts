'use server'

import { getMumbleApi } from '@/methods/data/getMumbleApi'
import { MumblePost } from '@/types'

export async function getPost(id: string) {
  const api = await getMumbleApi()
  return (await api.posts.postsControllerSingle(id)).data as MumblePost
}
