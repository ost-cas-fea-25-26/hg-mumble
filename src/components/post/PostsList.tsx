'use client'

import { fetchPosts } from '@/actions/posts/fetchPosts'
import Post from '@/components/post/Post'
import { Loader } from 'hg-storybook'
import React, { RefObject, useCallback, useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'
import { useTranslations } from 'use-intl'
import { Post as MumblePost } from '@/mumble/api/generated/MumbleApi'

type Props = {
  initialPosts: MumblePost[]
  filters?: {
    creatorIds?: string[]
    likedByUserId?: string
  }
}

function getPostEventSource() {
  return new EventSource(`${process.env.NEXT_PUBLIC_API_URL}/posts/_sse`)
}

export default function PostsList({ initialPosts, filters }: Props) {
  const loaderDiv = useRef<HTMLDivElement>(null)
  const [posts, setPosts] = useState<MumblePost[]>(initialPosts)
  const [canFetchMore, setCanFetchMore] = useState<boolean>(initialPosts.length > 0)
  const [isLoaderInViewport, setIsInViewport] = useState<boolean>(false)
  const [loading, setLoading] = useState(false)
  const translate = useTranslations('mumble-post')

  const onPostCreated = (event: MessageEvent<string>) => {
    const post = JSON.parse(event.data) as MumblePost
    setPosts((prev) => [post, ...prev])
    toast(translate('new-posts'), {
      action: {
        label: translate('see-now'),
        onClick: () => window.scrollTo(0, 0),
      },
    })
  }

  const onScroll = () => {
    if (isInViewport(loaderDiv as RefObject<HTMLDivElement>)) {
      setIsInViewport(true)
    } else {
      setIsInViewport(false)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', onScroll)
    const events = getPostEventSource()
    events.addEventListener('postCreated', onPostCreated)
    return () => {
      window.removeEventListener('scroll', onScroll)
      events.close()
    }
  }, [])

  const isInViewport = (element: RefObject<HTMLDivElement>) => {
    if (!element.current) return false
    const bounding = element.current.getBoundingClientRect()
    return (
      bounding.top >= 0 &&
      bounding.left >= 0 &&
      bounding.right <= (window.innerWidth || document.documentElement.clientWidth) &&
      bounding.top <= (window.innerHeight || document.documentElement.clientHeight)
    )
  }

  const loadMorePosts = useCallback(async () => {
    if (loading || !canFetchMore) return

    setLoading(true)
    const lastPostId = posts[posts.length - 1]?.id

    try {
      const { data } = await fetchPosts({
        olderThan: lastPostId,
        limit: 5,
        creators: filters?.creatorIds ?? undefined,
        likedBy: filters?.likedByUserId ? [filters.likedByUserId] : undefined,
      })

      if (data && data.length > 0) {
        setPosts((prev) => [...prev, ...data])
      } else {
        setCanFetchMore(false)
      }
    } catch (e) {
      console.error('Error fetching posts:', e)
    } finally {
      setLoading(false)
    }
  }, [posts, loading, canFetchMore, filters?.creatorIds, filters?.likedByUserId])

  useEffect(() => {
    if (isLoaderInViewport) {
      loadMorePosts()
    }
  }, [isLoaderInViewport, loadMorePosts])

  return (
    <>
      {posts.map((post) => {
        return <Post key={post.id} post={post} />
      })}
      {canFetchMore && (
        <div ref={loaderDiv} className="flex justify-center py-4">
          <Loader size={'large'} color={'primary'} />
        </div>
      )}
    </>
  )
}
