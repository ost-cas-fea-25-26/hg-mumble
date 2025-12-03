'use server'
import { getMumbleApi } from '@/actions/getMumbleApi'

export async function addComment(id: string, text: string, image?: File) {
  const api = await getMumbleApi()
  const response = await api.posts.repliesCreate(id, { text, media: image })
  return response.json()
}
