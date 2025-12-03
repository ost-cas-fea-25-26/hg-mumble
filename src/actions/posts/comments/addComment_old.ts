'use server'
import { getMumbleApiOld } from '@/actions/getMumbleApi'

export async function addComment(id: string, text: string, image?: File) {
  const api = await getMumbleApiOld()
  return await api.posts.postsControllerReply(id, { text, image })
}
