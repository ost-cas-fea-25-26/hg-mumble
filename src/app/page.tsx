'use client'
import { Button } from 'hg-storybook'
import Header from '@/components/Header/Header'
import { toast } from 'sonner'

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className={'flex flex-1 items-center justify-center'}>
        <Button variant="gradient" onClick={() => toast('sdfadfa')}>
          Button
        </Button>
      </main>
    </div>
  )
}
