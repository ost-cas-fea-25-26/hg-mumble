import { getRandomQuote } from '@/actions/getRandomQuote'
import clsx from 'clsx'
import { getTranslations } from 'next-intl/server'

export default async function PageHeader() {
  const translate = await getTranslations('general')
  const quote = await getRandomQuote()

  return (
    <div>
      <h1 className={clsx('text-primary text-4xl font-bold')}>{translate('welcome-to-mumble')}</h1>
      <span className={clsx('text-secondary text-lg font-semibold')}>{quote}</span>
    </div>
  )
}
