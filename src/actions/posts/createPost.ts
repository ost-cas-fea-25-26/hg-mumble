'use server'

import { getMumbleApi } from '@/actions/getMumbleApi'

export async function createPost(text: string, image?: File) {
  const api = await getMumbleApi()
  const data = await api.posts.postsCreate({
    media: image,
    text,
  })
  return data.json()
}
