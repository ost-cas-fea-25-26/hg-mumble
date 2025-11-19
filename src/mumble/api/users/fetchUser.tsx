import { MumbleUser } from '@/common/types'

export async function fetchUser(url: string): Promise<MumbleUser> {
  const res = await fetch(url, { method: 'GET' })
  return await res.json()
}
