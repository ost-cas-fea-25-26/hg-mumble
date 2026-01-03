'use client'

import { followUser } from '@/actions/users/followers/addFollow'
import { unfollowUser } from '@/actions/users/followers/removeFollow'
import { Button, Cross, Mumble } from 'hg-storybook'
import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'
import { toast } from 'sonner'
import { useTranslations } from 'use-intl'

interface Props {
  userId: string
  initialIsFollowing: boolean
  userName: string
}

export default function ProfileFollow({ userId, initialIsFollowing, userName }: Props) {
  const t = useTranslations('recommendations')
  const router = useRouter()

  const [isPending, startTransition] = useTransition()
  const [isFetching, setIsFetching] = useState(false)

  const [isFollowing, setIsFollowing] = useState(initialIsFollowing)

  const handleToggle = async () => {
    setIsFetching(true)

    const newState = !isFollowing
    setIsFollowing(newState)

    try {
      let status

      if (newState) {
        status = await followUser(userId)
        if (status === 204 || status === 200) {
          toast.success(t('followed-success', { name: userName }))
        }
      } else {
        status = await unfollowUser(userId)
        if (status === 204 || status === 200) {
          toast.success(t('unfollowed-success', { name: userName }))
        }
      }

      if (status !== 204 && status !== 200) {
        throw new Error('Action failed')
      }

      startTransition(() => {
        router.refresh()
      })
    } catch (error) {
      setIsFollowing(!newState)
      toast.error(t('unexpected-error'))
    } finally {
      setIsFetching(false)
    }
  }

  const isBusy = isFetching || isPending

  return (
    <div className="w-full flex justfify-end">
      <Button variant={isFollowing ? 'secondary' : 'primary'} size="small" onClick={handleToggle} disabled={isBusy}>
        {isFollowing ? t('unfollow') : t('follow')}

        {isFollowing ? <Cross color="white" size={'xs'}></Cross> : <Mumble color="white" size={'xs'} />}
      </Button>
    </div>
  )
}
