import { MumblePostsList } from '@/types/MumbleApi.types'

export async function fetchPosts(url: string): Promise<MumblePostsList> {
  const res = await fetch(url, {
    method: 'GET',
  })
  return res.json()
}
