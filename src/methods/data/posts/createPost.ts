import { MumblePostCreateRequest } from '@/types/MumbleApi.types'

export async function createPost(url: string, { arg }: { arg: MumblePostCreateRequest }) {
  return await fetch(url, {
    method: 'POST',
    body: JSON.stringify(arg),
  })
}
