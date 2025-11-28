'use server'
import { authHeader } from '@/lib/auth'
import { Api as Api_old } from '@/mumble/api/generated/Api'
import { Api } from '@/mumble/api/generated/Api2'

export async function getMumbleApiOld(): Promise<Api_old<unknown>> {
  return new Api_old({
    baseUrl: process.env.API_URL_OLD,
    baseApiParams: {
      headers: {
        ...(await authHeader()),
      },
    },
  })
}
export async function getMumbleApi(): Promise<Api<unknown>> {
  return new Api({
    baseUrl: process.env.API_URL,
    baseApiParams: {
      headers: {
        ...(await authHeader()),
      },
    },
  })
}
