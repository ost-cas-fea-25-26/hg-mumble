import { betterAuth } from 'better-auth'
import { Pool } from 'pg'
import { nextCookies } from 'better-auth/next-js'
import { genericOAuth } from 'better-auth/plugins'
import { headers } from 'next/headers'
import { cache } from 'react'

export const auth = betterAuth({
  database: new Pool({
    connectionString: process.env.POSTGRES_URL,
  }),
  secret: process.env.BETTER_AUTH_SECRET,
  trustedOrigins: [process.env.NEXT_PUBLIC_BASE_URL as string],
  session: {
    expiresIn: 60 * 60 * 12, // 12 hours
    updateAge: 60 * 60 * 12, // 12 hours
    cookieCache: {
      enabled: true,
      maxAge: 60 * 5, // 5 minutes
    },
  },
  advanced: {
    useSecureCookies: process.env.NODE_ENV === 'production',
    cookiePrefix: 'better-auth',
  },
  plugins: [
    nextCookies(),
    genericOAuth({
      config: [
        {
          providerId: 'zitadel',
          clientId: process.env.CLIENT_ID as string,
          clientSecret: '',
          discoveryUrl:
            'https://cas-fee-adv-ed1ide.zitadel.cloud/.well-known/openid-configuration',
          scopes: [
            'openid',
            'profile',
            'address',
            'phone',
            'email',
            'urn:zitadel:iam:org:project:id:zitadel:aud',
            'urn:zitadel:iam:org:project:id:342477345380127384:aud',
          ],
          pkce: true,
        },
      ],
    }),
  ],
})

export const getSession = cache(async () => {
  return await auth.api.getSession({
    headers: await headers(),
  })
})

export const getAccessToken = cache(async () => {
  const reqHeaders = await headers()
  const session = await auth.api.getSession({ headers: reqHeaders })

  if (!session?.user) {
    return null
  }

  const token = await auth.api.getAccessToken({
    headers: reqHeaders,
    body: {
      providerId: 'zitadel',
    },
  })

  if (!token?.accessToken) {
    return null
  }

  return token
})

const clientId = process.env.CLIENT_ID
const clientSecret = process.env.CLIENT_SECRET

export async function exchangeToken({
  audience,
  subject, // optional: set to a user ID for impersonation
}: {
  [key: string]: string
}) {
  const subjectToken = await getAccessToken()
  const body: {
    [key: string]: any
  } = {
    grant_type: 'urn:ietf:params:oauth:grant-type:token-exchange',
    subject_token: subjectToken?.accessToken,
    subject_token_type: 'urn:ietf:params:oauth:token-type:access_token',
    scope: [
      'openid',
      'profile',
      'address',
      'phone',
      'email',
      'urn:zitadel:iam:org:project:id:zitadel:aud',
      'urn:zitadel:iam:org:project:id:342477345380127384:aud',
    ].join(' '),
  }
  if (audience) body.audience = audience
  if (subject) body.subject = subject

  const res = await fetch(process.env.ZITADEL_API_URL + '/oauth/v2/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Bearer ${subjectToken?.accessToken}`,
    },
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    const err = await res.text()
    throw new Error(`Token exchange failed: ${res.status} ${err}`)
  }
  return res.json()
}
