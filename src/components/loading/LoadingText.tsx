import clsx from 'clsx'

interface Props {
  width?: string
}

export default function LoadingText({ width = 'w-full' }: Props) {
  return <p className={clsx('h-[1em] animate-pulse rounded-md bg-gray-300 text-transparent', width)}>.</p>
}
