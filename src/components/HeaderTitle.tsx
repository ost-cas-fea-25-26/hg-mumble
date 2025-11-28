import { Mumble } from 'hg-storybook'
import React from 'react'

type Props = {}

export default function HeaderTitle({}: Props) {
  return (
    <div className={'flex items-center justify-between gap-2'}>
      <Mumble size={'s'} color={'white'} />
      <h1 className={'text-l desktop:text-xl font-bold'}>Mumble</h1>
    </div>
  )
}
