import { SpeechBubble } from 'hg-storybook'
import { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

export default function InfoMessage({ children }: Props) {
  return (
    <div className={'text-contrast mt-2 mb-2 flex gap-3 text-sm font-semibold '}>
      <SpeechBubble color={'currentColor'} size={'xs'} className={'mt-1'} />
      <p className={'max-w-64'}>{children}</p>
    </div>
  )
}
