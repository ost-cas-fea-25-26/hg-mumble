'use server'
import { getMumbleApi } from '@/actions/getMumbleApi'

export async function addComment(id: string, text: string, image?: File) {
  const api = await getMumbleApi()
  return await api.posts.repliesCreate(id, { text, media: image })
}
