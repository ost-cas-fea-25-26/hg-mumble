import { Mumble } from 'hg-storybook'
import { getTranslations } from 'next-intl/server'
import Link from 'next/link'
import React from 'react'

export default async function HeaderTitle() {
  const translate = await getTranslations('general')
  return (
    <Link href="/" className="flex items-center justify-between gap-2">
      <Mumble size={'s'} color={'white'} />
      <h1 className={'text-l desktop:text-xl font-bold'}>{translate('mumble')}</h1>
    </Link>
  )
}
