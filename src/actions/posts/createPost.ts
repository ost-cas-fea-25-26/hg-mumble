'use server'

import { getMumbleApi } from '@/actions/getMumbleApi'

export async function createPost(text: string, image?: File) {
  const api = await getMumbleApi()
  return await api.posts
    .postsCreate({
      media: image,
      text,
    })
    .then((res) => res.json())
}
