'use server'

import { getMumbleApi } from '@/methods/data/getMumbleApi'

export async function createPost(text: string, image?: File) {
  const api = await getMumbleApi()
  return await api.posts.postsControllerCreate({
    image,
    text,
  })
}
