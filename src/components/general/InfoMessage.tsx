import { SpeechBubble } from 'hg-storybook'
import { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

export default function InfoMessage({ children }: Props) {
  return (
    <p className={'text-contrast mt-2 mb-2 flex items-center gap-2 text-sm font-semibold'}>
      <SpeechBubble color={'currentColor'} size={'xs'} />
      <span>{children}</span>
    </p>
  )
}
