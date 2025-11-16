import { Button } from 'hg-storybook'
import Header from '@/components/Header/Header'
import { toast } from 'sonner'
import { getSession } from '@/lib/auth'

export default async function Home() {
  const session = await getSession()
  return (
    <>
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className={'flex flex-1 items-center justify-center'}>
          {session?.session ? `welcome ${session.user?.name}` : 'not logged in'}
        </main>
      </div>
    </>
  )
}
