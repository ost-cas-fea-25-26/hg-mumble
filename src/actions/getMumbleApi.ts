'use server'
import { authHeader } from '@/lib/auth'
import { Api as MumbleApi } from '@/mumble/api/generated/MumbleApi'
import { Api as MumbleApiOld } from '@/mumble/api/generated/MumbleApiOld'

export async function getMumbleApiOld(): Promise<MumbleApiOld<unknown>> {
  return new MumbleApiOld({
    baseUrl: process.env.API_URL_OLD,
    baseApiParams: {
      headers: {
        ...(await authHeader()),
      },
    },
  })
}
export async function getMumbleApi(): Promise<MumbleApi<unknown>> {
  return new MumbleApi({
    baseUrl: process.env.API_URL,
    baseApiParams: {
      headers: {
        ...(await authHeader()),
      },
    },
  })
}
