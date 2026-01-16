import { type CookieOptions, createServerClient } from '@supabase/ssr'
import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies'

export const createClient = (cookieStore: ReadonlyRequestCookies) => {
  return createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value
      },
      set(name: string, value: string, options: CookieOptions) {
        try {
          cookieStore.set({ name, value, ...options })
          // eslint-disable-next-line no-unused-vars
        } catch (error) {
          // silent
        }
      },
      remove(name: string, options: CookieOptions) {
        try {
          cookieStore.set({ name, value: '', ...options })
          // eslint-disable-next-line no-unused-vars
        } catch (error) {
          // silent
        }
      },
    },
  })
}
