import { WordRotate } from '@/components/WordRotate'
import { Mumble } from 'hg-storybook'
import { getTranslations } from 'next-intl/server'

export default async function LoginAside() {
  const translate = await getTranslations('general')

  const topics = translate('rotating-topics')
    .split(',')
    .map((w) => w.trim())
    .filter(Boolean)

  return (
    <aside className={'flex h-full flex-col items-center justify-center gap-2 text-white'}>
      <Mumble size={'xl'} color={'currentColor'}></Mumble>

      <h1 className={'desktop:text-8xl text-6xl font-bold'}>{translate('mumble')}</h1>

      <div
        className={
          'text-contrast-400 desktop:text-4xl flex flex-wrap items-baseline justify-center gap-x-3 text-center text-2xl font-bold'
        }
      >
        <span>{translate('login-aside-subtitle')}</span>
        <WordRotate
          words={topics}
          duration={3500}
          className="text-contrast-100 font-bold text-center desktop:text-left w-45"
        />
      </div>
    </aside>
  )
}
