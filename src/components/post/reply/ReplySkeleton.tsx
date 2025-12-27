'use client'

import LoadingText from '@/components/loading/LoadingText'
import clsx from 'clsx'
import React from 'react'
import { Avatar, Time } from '@/lib/hg-storybook'

export default function ReplySkeleton() {
  return (
    <div className="relative flex min-h-48 w-full flex-col justify-around gap-2 rounded-md bg-white p-4">
      <div
        className={clsx(
          //left -32 because avatar-width is 64
          'flex h-16 w-full items-center justify-start gap-3'
        )}
      >
        <Avatar src={undefined} size={'s'} borderless />
        <div>
          <h3 className={clsx('text-lg font-bold')}>
            <LoadingText width={'w-32'} />
          </h3>
          <div className={clsx('mt-1 flex items-center gap-4')}>
            <div className={'text-primary flex items-center justify-start gap-1 font-bold'}>
              <LoadingText width={'w-25'} />
            </div>
            <span className={clsx('text-secondary-400 flex items-center gap-2 font-semibold')}>
              <Time size={'xs'} color={'currentColor'} />
              <LoadingText width={'w-25'} />
            </span>
          </div>
        </div>
      </div>
      {/*content*/}
      <div>
        <div className={'flex max-h-50 gap-4'}>
          <span className={'flex w-full flex-col gap-2'}>
            <LoadingText />
            <LoadingText />
            <LoadingText width="w-[80%]" />
          </span>
        </div>
      </div>
      <div className="flex h-6 w-[25%] items-end gap-4 text-lg">
        <LoadingText />
      </div>
    </div>
  )
}
