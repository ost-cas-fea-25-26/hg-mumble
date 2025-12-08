import { router } from 'better-auth/api'
import { genericOAuthClient } from 'better-auth/client/plugins'
import { createAuthClient } from 'better-auth/react'

export const authClient = createAuthClient({
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
  plugins: [genericOAuthClient()],
})
export const { useSession } = authClient

export const signOut = async () => {
  return await authClient.signOut({})
}

export const signIn = async () => {
  return await authClient.signIn.oauth2({
    providerId: 'zitadel',
    callbackURL: '/',
  })
}
