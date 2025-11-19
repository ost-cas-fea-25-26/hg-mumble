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

export type MumbleUser = {
  id: string
  userName: string
  firstName: string
  lastName: string
  avatarUrl: string
}

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

export type MumbleCommentCreateRequest = {
  text?: string
  image?: File | null
}

export type MumblePostCreateRequest = {
  text?: string
  image?: File | null
}
