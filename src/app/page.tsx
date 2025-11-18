import Header from '@/components/Header/Header'
import { getSession } from '@/lib/auth'
import { getTranslations } from 'next-intl/server'

export default async function Home() {
  const session = await getSession()
  const translate = await getTranslations('general')

  return (
    <>
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className={'flex flex-1 items-center justify-center'}>
          {session?.session
            ? translate('welcome', { name: session.user?.name })
            : translate('not-logged-in')}
        </main>
      </div>
    </>
  )
}
