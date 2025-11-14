import { betterAuth } from 'better-auth'
import { Pool } from 'pg'
import { nextCookies } from 'better-auth/next-js'
import { genericOAuth } from 'better-auth/plugins'

export const auth = betterAuth({
  database: new Pool({
    connectionString: process.env.POSTGRES_URL,
  }),
  secret: process.env.BETTER_AUTH_SECRET,
  trustedOrigins: [`${process.env.NEXT_PUBLIC_BASE_URL}`],
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
            'email',
            'urn:zitadel:iam:org:project:id:346667548860744250:aud',
          ],
          pkce: true,
        },
      ],
    }),
  ],
})
