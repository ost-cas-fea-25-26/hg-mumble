'use server'

import { getServiceAccessToken } from '@/lib/auth'

const sessionUrl = '/v2/sessions'
export default async function createLoginSession(): Promise<string> {
  const serviceAccount = await getServiceAccessToken()
  const mems = await fetch(`${process.env.ZITADEL_API_URL}/auth/v1/memberships/me/_search`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${serviceAccount.accessToken}`,
      body: JSON.stringify({}),
    },
  })
  const sessionPost = await fetch(`${process.env.ZITADEL_API_URL}${sessionUrl}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${serviceAccount.accessToken}`,
      body: JSON.stringify({}),
    },
  })
  console.log(sessionPost.status)
  const ss = await sessionPost.json()
  console.log(ss)
  const res = await mems.json()
  console.log(res)
  return res
}
