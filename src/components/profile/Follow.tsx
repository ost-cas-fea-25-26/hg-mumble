'use client'

import { followUser } from '@/actions/users/followers/addFollow'
import { unfollowUser } from '@/actions/users/followers/removeFollow'
import { Button, Mumble } from 'hg-storybook'
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
    <div className="w-full desktop:w-auto">
      <Button
        width="w-full"
        variant={isFollowing ? 'secondary' : 'primary'}
        size="medium"
        onClick={handleToggle}
        disabled={isBusy}
      >
        {isFollowing ? t('unfollow') : t('follow')}

        {!isFollowing && <Mumble color="white" className="h-4 w-4 ml-2" />}
      </Button>
    </div>
  )
}
