'use client'
import { Button } from 'hg-storybook'
import Header from '@/components/Header/Header'
import { toast } from 'sonner'
import { useTranslations } from 'use-intl'

export default function Home() {
  const t = useTranslations('general')
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className={'flex flex-1 items-center justify-center'}>
        <Button
          variant="gradient"
          onClick={() => toast.success('this is a test toast')}
        >
          {t('test')}
        </Button>
      </main>
    </div>
  )
}
