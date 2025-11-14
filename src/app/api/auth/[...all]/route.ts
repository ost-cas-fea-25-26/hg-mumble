import { nextCookies, toNextJsHandler } from 'better-auth/next-js'
import { genericOAuth } from 'better-auth/plugins'
import Database from 'better-sqlite3'
import { betterAuth } from 'better-auth'

const auth = betterAuth({
  database: new Database('./sqlite.db'),
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
          redirectURI: 'http://localhost:3000/feed',
        },
      ],
    }),
  ],
})

export const { POST, GET } = toNextJsHandler(auth)
