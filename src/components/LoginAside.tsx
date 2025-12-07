import { Mumble } from 'hg-storybook'
import { getTranslations } from 'next-intl/server'
import React from 'react'

type Props = {}

export default async function LoginAside({}: Props) {
  const translate = await getTranslations('general')
  return (
    <aside className={'flex h-full flex-col items-center justify-center gap-2 text-white'}>
      <Mumble size={'xl'} color={'currentColor'}></Mumble>
      <h1 className={'desktop:text-8xl text-6xl font-bold'}>{translate('mumble')}</h1>
      <p className={'text-contrast-400 desktop:text-4xl text-center text-2xl font-bold'}>
        {translate.rich('login-aside-subtitle', {
          tag: (chunk) => (
            <span className={'text-contrast-100'}>
              {chunk}
              <span className={'text-contrast-400'}>.</span>
            </span>
          ),
        })}
      </p>
    </aside>
  )
}
