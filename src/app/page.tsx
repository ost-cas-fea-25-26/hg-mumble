import { getTranslations } from 'next-intl/server'
import { getSession } from '@/lib/auth'

export default async function Home() {
  const session = await getSession()
  const translate = await getTranslations('general')

  return (
    <>
      <div className="flex min-h-screen flex-col">
        <main className={'flex flex-1 items-center justify-center'}>
          {session?.session ? translate('welcome', { name: session.user?.name }) : translate('not-logged-in')}
        </main>
      </div>
    </>
  )
}
