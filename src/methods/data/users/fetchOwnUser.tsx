import { MumbleUser } from '@/types'

export async function fetchOwnUser(url: string): Promise<MumbleUser> {
  const res = await fetch(url, { method: 'GET' })
  return await res.json()
}
