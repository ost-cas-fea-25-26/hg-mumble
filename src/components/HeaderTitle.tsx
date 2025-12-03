import { Mumble } from 'hg-storybook'
import { getTranslations } from 'next-intl/server'
import React from 'react'

export default async function HeaderTitle() {
  const translate = await getTranslations('general')
  return (
    <div className={'flex items-center justify-between gap-2'}>
      <Mumble size={'s'} color={'white'} />
      <h1 className={'text-l desktop:text-xl font-bold'}>{translate('mumble')}</h1>
    </div>
  )
}
