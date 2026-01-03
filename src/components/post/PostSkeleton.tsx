import LoadingText from '@/components/loading/LoadingText'
import { Avatar, Time } from '@/lib/hg-storybook'
import clsx from 'clsx'

export default function PostSkeleton() {
  return (
    <div className="relative flex min-h-48 w-full flex-col justify-around gap-2 rounded-md bg-white p-4">
      <div className="desktop:h-16 flex w-full items-center justify-start gap-3">
        <div className="absolute top-6 left-[-32]">
          <Avatar src={undefined} size={'m'} />
        </div>
        <div className="pl-6">
          <h3 className={clsx('text-lg font-bold')}>
            <LoadingText width={'w-32'} />
          </h3>
          <div
            className={clsx('desktop:flex-row desktop:items-center desktop:gap-4 desktop:w-full flex flex-col gap-2')}
          >
            <div className={'text-primary mt-1 flex items-center justify-start gap-1 font-bold'}>
              <LoadingText width={'w-25'} />
            </div>
            <span className={clsx('text-secondary-400 flex items-center gap-2 font-semibold')}>
              <Time size={'xs'} color={'currentColor'} />
              <span>
                <LoadingText width={'w-30'} />
              </span>
            </span>
          </div>
        </div>
      </div>
      <div className="desktop:mt-0 mt-4 mx-6">
        <span className={'flex w-full flex-col gap-2'}>
          <LoadingText />
          <LoadingText />
          <LoadingText width="w-[80%]" />
        </span>
      </div>
      <div className="flex h-6 w-[80%] items-end gap-4 text-lg mx-6 mt-2">
        <LoadingText />
        <LoadingText />
        <LoadingText />
      </div>
    </div>
  )
}
