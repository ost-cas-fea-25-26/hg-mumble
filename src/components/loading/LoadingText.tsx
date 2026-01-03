import clsx from 'clsx'

interface Props {
  width?: string
  className?: string
}

export default function LoadingText({ width = 'w-full', className }: Props) {
  return <p className={clsx('h-[1em] animate-pulse rounded-md bg-gray-300 text-transparent', width, className)}>.</p>
}
