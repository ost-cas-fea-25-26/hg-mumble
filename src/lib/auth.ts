import { betterAuth } from 'better-auth'
import { nextCookies } from 'better-auth/next-js'
import { genericOAuth } from 'better-auth/plugins'
import { headers } from 'next/headers'
import { Pool } from 'pg'
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
          discoveryUrl: 'https://cas-fee-adv-ed1ide.zitadel.cloud/.well-known/openid-configuration',
          scopes: [
            'openid',
            'profile',
            'email',
            'urn:zitadel:iam:org:project:id:342477345380127384:aud',
            'urn:zitadel:iam:org:project:id:348701753820117818:aud',
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

export async function authHeader(): Promise<HeadersInit> {
  const token = await getAccessToken()
  return token?.accessToken ? { Authorization: `Bearer ${token?.accessToken}` } : {}
}
