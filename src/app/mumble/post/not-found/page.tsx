import { Button, SpeechBubbleEmpty } from 'hg-storybook'
import { getTranslations } from 'next-intl/server'
import Link from 'next/link'

export default async function PostNotFoundPage() {
  const translate = await getTranslations('mumble-post')

  return (
    <div className="my-auto flex w-full flex-col items-center justify-center rounded-md bg-white p-12">
      <SpeechBubbleEmpty size="l" color="var(--color-primary)" className="mb-6" />
      <h1 className="text-primary text-3xl font-bold mb-3">{translate('not-found-title')}</h1>
      <p className="text-secondary text-md mb-6">{translate('not-found-description')}</p>
      <Link href="/mumble">
        <Button variant="primary">{translate('back-to-feed')}</Button>
      </Link>
    </div>
  )
}
