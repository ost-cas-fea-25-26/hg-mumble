import { MumbleCommentCreateRequest } from '@/common/types'

export async function createComment(url: string, { arg }: { arg: MumbleCommentCreateRequest }) {
  return await fetch(url, {
    method: 'POST',
    body: JSON.stringify(arg),
  })
}
