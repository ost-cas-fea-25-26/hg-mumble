import { Mumble } from 'hg-storybook'
import { getTranslations } from 'next-intl/server'
import { RotatingTag } from './RotatingTag'

export default async function LoginAside() {
  const translate = await getTranslations('general')
  const topics = translate('rotating-topics')

  return (
    <aside className={'flex h-full flex-col items-center justify-center gap-2 text-white'}>
      <Mumble size={'xl'} color={'currentColor'}></Mumble>
      <h1 className={'desktop:text-8xl text-6xl font-bold'}>{translate('mumble')}</h1>
      <p
        className={
          'text-contrast-400 desktop:text-4xl flex flex-wrap items-baseline justify-center gap-x-3 text-center text-2xl font-bold'
        }
      >
        <span>{translate('login-aside-subtitle')}</span>
        <RotatingTag words={topics} />
      </p>
    </aside>
  )
}
