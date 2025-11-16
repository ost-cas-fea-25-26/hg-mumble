'use server'
import { Api } from '@/mumble/api/generated/Api'
import { MumblePost } from '@/mumble/api/posts/createPost'

export type MumblePostGetRequestParams = {
  offset?: number
  limit?: number
  newerThan?: string
  olderThan?: string
  creator?: string
}

export type MumblePostsList = {
  count: number
  data: MumblePost[]
}

export async function getPosts(
  requestParams: MumblePostGetRequestParams,
): Promise<MumblePostsList> {
  const api = new Api()
  return await api.posts
    .postsControllerList(requestParams, {
      baseUrl: process.env.API_URL,
    })
    .then((res) => res.json())
}
