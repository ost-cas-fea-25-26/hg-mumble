'use server'

import { getMumbleApi } from '@/actions/getMumbleApi'

export async function editPost(id: string, formData: FormData) {
  const api = await getMumbleApi()
  const text = formData.get('text') as string
  const media = formData.get('media') as File | null
  const removeMedia = formData.get('removeMedia') === 'true'

  await api.posts.postsPartialUpdate(id, { text })

  if (media && media.size > 0) {
    await api.posts.mediaUpdate(id, { media })
  } else if (removeMedia) {
    await api.posts.mediaDelete(id)
  }

  return { success: true }
}
