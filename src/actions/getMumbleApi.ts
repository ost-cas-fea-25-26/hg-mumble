import { authHeader } from '@/lib/auth'
import { Api as MumbleApi } from '@/mumble/api/generated/MumbleApi'

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
