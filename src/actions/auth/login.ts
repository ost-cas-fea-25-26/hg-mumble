'use server'

import { getServiceAccessToken } from '@/lib/auth'
import { Api as MumbleApi } from '@/mumble/api/generated/MumbleApi'

const zitadel = {
  post: async (url: string, payload: any) => _fetch(url, 'POST', payload),
  get: async (url: string) => _fetch(url),
  patch: async (url: string, payload: any) => _fetch(url, 'PATCH', payload),
}

//leider funktioniert login via eigenes GUI nicht. Zitadel-Ressourcen können mit dem session token
// aus dem vorgesehenen Flow zwar abgefragt werden, jedoch scheitert's dann bei den Mumble-Ressourcen,
// welche OIDC voraussetzen
export async function login(loginName: string, password: string) {
  const response = await zitadel.post('/v2/sessions', {
    checks: {
      user: { loginName },
      password: { password },
    },
  })
  console.log('-------session initial-------')
  const loginSession = await response.json()
  const token = loginSession.sessionToken
  console.log(JSON.stringify(loginSession, null, 2))
  const sessionDetails = await zitadel.get(`/v2/sessions/${loginSession.sessionId}`)
  console.log('-------session after usercheck-------')
  const createdSession = await sessionDetails.json()
  console.log(JSON.stringify(createdSession, null, 2))
  const user = await zitadel.get(`/v2/users/${createdSession.session.factors.user.id}`)
  const details = await user.json()
  console.log('-------------------zitadel user:------------------')
  console.log(JSON.stringify(details, null, 2))
  const post = await new MumbleApi({
    baseUrl: process.env.API_URL,
    baseApiParams: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  }).posts
    .postsCreate({
      text: 'Patrick Brunner versuchte sich via eigenes GUI einzuloggen. This incident will be reported.',
    })
    .then((res) => res.json())
    .catch(console.log)

  //irgendwas schlaues mit dem sessionToken anstellen
  return token
}

const baseUrl = process.env.ZITADEL_API_URL
const getHeaders = async () => {
  const serviceAccount = await getServiceAccessToken()
  return {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${serviceAccount.accessToken}`,
  }
}

const _fetch = async (url: string, method: string = 'GET', payload?: any) =>
  fetch(baseUrl + url, { method, headers: await getHeaders(), body: payload ? JSON.stringify(payload) : null })
