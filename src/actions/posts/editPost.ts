'use server'

import { getMumbleApi } from '@/actions/getMumbleApi'

export async function editPost(id: string, formData: FormData) {
  const api = await getMumbleApi()
  const text = formData.get('text') as string
  const media = formData.get('media') as File | null

  const data = await api.posts.postsUpdate(id, {
    media: media || undefined,
    text,
  })
  return data.json()
}
