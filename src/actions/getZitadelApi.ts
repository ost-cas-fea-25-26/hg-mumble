import { authHeader } from '@/lib/auth'

class ZitadelApi {
  baseUrl = process.env.ZITADEL_API_URL

  private async fetch(method: string = 'GET', url: string, payload?: any, stringify: boolean = false) {
    return fetch(`${this.baseUrl}${url}`, {
      method: method,
      headers: {
        ...(await authHeader()),
      },
      body: payload ? (stringify ? JSON.stringify(payload) : payload) : null,
    })
  }

  async updateAvatar(url: string, payload: any, stringify: boolean = true) {
    return this.fetch('POST', url, payload, stringify)
  }
  async updateUser(url: string, payload: any) {
    return this.fetch('PATCH', url, payload, true)
  }
}

export function getZitadelApi(): ZitadelApi {
  return new ZitadelApi()
}
