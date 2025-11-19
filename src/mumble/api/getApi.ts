'use server'
import { authHeader } from '@/lib/auth'
import { Api } from '@/mumble/api'

export async function getApi(): Promise<Api<unknown>> {
  return new Api({
    baseUrl: process.env.API_URL,
    baseApiParams: {
      headers: {
        ...(await authHeader()),
      },
    },
  })
}
