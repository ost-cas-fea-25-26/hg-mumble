'use client'

import { fetchPosts } from '@/actions/posts/fetchPosts'
import { Post as MumblePost } from '@/mumble/api/generated/MumbleApi'
import { useInViewport } from 'ahooks'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

type Filters = {
  creatorIds?: string[]
  likedByUserId?: string
}

type Props = {
  initialPosts: MumblePost[]
  filters?: Filters
  prefetchOffset?: number
  limit?: number
}

export function useInfinitePosts({ initialPosts, filters, prefetchOffset = 20, limit = 15 }: Props) {
  const loaderRef = useRef<HTMLSpanElement>(null)
  const prefetchRef = useRef<HTMLSpanElement>(null)
  const lastFetchedCursorRef = useRef<string | undefined>(undefined)

  const [posts, setPosts] = useState<MumblePost[]>(initialPosts)
  const [canFetchMore, setCanFetchMore] = useState<boolean>(initialPosts.length > 0)
  const [loading, setLoading] = useState(false)

  const prefetchAnchorPostId = useMemo(() => {
    const index = Math.max(0, posts.length - prefetchOffset)
    return posts[index]?.id
  }, [posts, prefetchOffset])

  const [shouldPrefetch] = useInViewport(prefetchRef)
  const [isLoaderVisible] = useInViewport(loaderRef)

  const loadMorePosts = useCallback(async () => {
    if (loading || !canFetchMore) return

    const lastPostId = posts[posts.length - 1]?.id
    if (lastFetchedCursorRef.current === lastPostId) return
    lastFetchedCursorRef.current = lastPostId

    setLoading(true)

    try {
      const { data } = await fetchPosts({
        olderThan: lastPostId,
        limit,
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
  }, [posts, loading, canFetchMore, filters?.creatorIds, filters?.likedByUserId, limit])

  useEffect(() => {
    if (typeof history !== 'undefined' && 'scrollRestoration' in history) {
      history.scrollRestoration = 'manual'
    }
  }, [])

  useEffect(() => {
    if (shouldPrefetch || isLoaderVisible) {
      loadMorePosts()
    }
  }, [shouldPrefetch, isLoaderVisible, loadMorePosts])

  return {
    posts,
    setPosts,
    canFetchMore,
    loading,
    loaderRef,
    prefetchRef,
    prefetchAnchorPostId,
  }
}
