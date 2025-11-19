import { getSession } from '@/lib/auth'
import { getTranslations } from 'next-intl/server'
import { redirect } from 'next/navigation'

export default async function Home() {
  const session = await getSession()
  const translate = await getTranslations('general')

  if (!session) return redirect('/signin')
  redirect('/feed')
}
