import { genericOAuthClient } from 'better-auth/client/plugins'
import { createAuthClient } from 'better-auth/react'

export const authClient = createAuthClient({
  /** The base URL of the server (optional if you're using the same domain) */
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
  plugins: [genericOAuthClient()],
})

export const signIn = async () => {
  return await authClient.signIn.oauth2({
    providerId: 'zitadel',
    callbackURL: '/feed',
    errorCallbackURL: '/error',
  })
}
