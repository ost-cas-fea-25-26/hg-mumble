import { Post as MumblePost } from '@/mumble/api/generated/MumbleApi'
import { useEffect } from 'react'
import { toast } from 'sonner'
import { useTranslations } from 'use-intl'

function getPostEventSource() {
  return new EventSource(`${process.env.NEXT_PUBLIC_API_URL}/posts/_sse`)
}

// eslint-disable-next-line no-unused-vars
export default function usePostCreated(updatePosts: (newPost: MumblePost[]) => void, posts: MumblePost[]) {
  const translate = useTranslations('mumble-post')

  const onPostCreated = (event: MessageEvent<string>) => {
    const reply = JSON.parse(event.data) as MumblePost
    updatePosts([reply, ...posts])
    toast(translate('new-posts'), {
      action: {
        label: translate('see-now'),
        onClick: () => window.scrollTo(0, 0),
      },
    })
  }

  useEffect(() => {
    const events = getPostEventSource()
    events.addEventListener('postCreated', onPostCreated)
    return () => {
      events.close()
    }
  }, [])
}
