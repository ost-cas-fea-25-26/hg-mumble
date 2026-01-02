import LoadingText from '@/components/loading/LoadingText'
import { Avatar, Button, Link } from '@/lib/hg-storybook'
import clsx from 'clsx'

export default function CreateReplySkeleton() {
  return (
    <div
      className={clsx(
        'relative flex min-h-48 w-full flex-col justify-around gap-2 rounded-md bg-white pt-10 pr-4 pb-4 pl-4'
      )}
    >
      <div className="flex h-16 w-full items-center justify-start gap-3">
        <Avatar src={undefined} size={'s'} borderless />
        <div>
          <h3 className={clsx('text-lg font-bold')}>
            <LoadingText width={'w-32 mb-1'} />
          </h3>
          <div className={clsx('flex items-center gap-4')}>
            <Link url={`/mumble/profile`} className={'text-primary flex items-center justify-start gap-1 font-bold'}>
              <LoadingText width={'w-25'} />
            </Link>
          </div>
        </div>
      </div>

      <div>
        <div className={clsx('mb-4 flex items-center gap-4 text-[160px]')}>
          <LoadingText />
        </div>
        <div className={'desktop:flex-row desktop:gap-4 flex w-full flex-col items-center justify-center gap-2'}>
          <Button width={'w-full'} variant={'secondary'} size={'medium'}>
            <LoadingText width="w-32" />
          </Button>
          <Button type="submit" width={'w-full'} disabled={true}>
            <LoadingText width="w-32" />
          </Button>
        </div>
      </div>
    </div>
  )
}
