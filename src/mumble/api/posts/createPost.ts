import { Api } from '@/mumble/api/generated/Api'

export type MumblePost = {
  text: string
  image: File | null
  creator: string
  id: string
  likeCount: number
  likedByUser: boolean
  mediaType: string | null
  mediaUrl: string | null
  replyCount: number
  type: string | null
}

export async function createPost(post: MumblePost) {
  const api = new Api()
  return api.posts.postsControllerCreate(post, {})
}
