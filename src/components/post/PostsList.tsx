'use client'

import { fetchPosts } from '@/actions/posts/fetchPosts'
import Post from '@/components/post/Post'
import PostSkeleton from '@/components/post/PostSkeleton'
import usePostCreated from '@/hooks/usePostCreated'
import { Post as MumblePost } from '@/mumble/api/generated/MumbleApi'
import { useInViewport } from 'ahooks'
import { Loader } from 'hg-storybook'
import { useCallback, useEffect, useRef, useState } from 'react'

type Props = {
  initialPosts: MumblePost[]
  filters?: {
    creatorIds?: string[]
    likedByUserId?: string
  }
}

export default function PostsList({ initialPosts, filters }: Props) {
  const loaderDiv = useRef<HTMLDivElement>(null)
  const [posts, setPosts] = useState<MumblePost[]>(initialPosts)
  const [canFetchMore, setCanFetchMore] = useState<boolean>(initialPosts.length > 0)
  const [loading, setLoading] = useState(false)
  const [inViewport] = useInViewport(loaderDiv)

  usePostCreated(setPosts, posts)

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
    if (inViewport) {
      loadMorePosts()
    }
  }, [inViewport, loadMorePosts])

  return (
    <>
      {posts.map((post) => {
        return <Post key={post.id} post={post} />
      })}
      {canFetchMore && (
        <span ref={loaderDiv}>
          <span className="desktop:flex hidden flex-col gap-4">
            <PostSkeleton />
            <PostSkeleton />
            <PostSkeleton />
          </span>

          <div className="p-5">
            <Loader size={'large'} color={'primary'} />
          </div>
        </span>
      )}
    </>
  )
}
