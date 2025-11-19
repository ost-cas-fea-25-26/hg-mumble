'use server'
import { authHeader } from '@/lib/auth'
import { Api } from '@/mumble/api/generated/Api'

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
