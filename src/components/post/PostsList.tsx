'use client'

import Post from '@/components/post/Post'
import PostSkeleton from '@/components/post/PostSkeleton'
import { useInfinitePosts } from '@/hooks/useInfinitePosts'
import usePostCreated from '@/hooks/usePostCreated'
import { Post as MumblePost } from '@/mumble/api/generated/MumbleApi'
import { Loader } from 'hg-storybook'
import { useCallback } from 'react'

type Props = {
  initialPosts: MumblePost[]
  filters?: {
    creatorIds?: string[]
    likedByUserId?: string
  }
  userName?: string
}

export default function PostsList({ initialPosts, filters, userName }: Props) {
  const { posts, setPosts, canFetchMore, loading, loaderRef, prefetchRef, prefetchAnchorPostId } = useInfinitePosts({
    initialPosts,
    filters,
    prefetchOffset: 20,
    limit: 15,
  })

  usePostCreated(setPosts, posts)

  const handlePostDeleted = useCallback(
    (postId: string) => {
      setPosts((prev) => prev.filter((p) => p.id !== postId))
    },
    [setPosts]
  )

  return (
    <>
      {posts.map((post: MumblePost) => {
        const shouldAttachPrefetchRef = post.id === prefetchAnchorPostId

        return (
          <span key={post.id} ref={shouldAttachPrefetchRef ? prefetchRef : undefined}>
            <Post post={post} userName={userName} onDeleted={() => handlePostDeleted(post.id!)} />
          </span>
        )
      })}

      {canFetchMore && (
        <span ref={loaderRef}>
          {loading && (
            <>
              <span className="desktop:flex hidden flex-col gap-4">
                <PostSkeleton />
                <PostSkeleton />
                <PostSkeleton />
              </span>

              <div className="p-5">
                <Loader size={'large'} color={'primary'} />
              </div>
            </>
          )}
        </span>
      )}
    </>
  )
}
