'use client'

import { fetchPosts } from '@/actions/posts/fetchPosts'
import Post from '@/components/post/Post'
import { Loader } from 'hg-storybook'
import React, { RefObject, useEffect, useMemo, useRef, useState } from 'react'
import { toast } from 'sonner'
import { useTranslations } from 'use-intl'
import { Post as MumblePost } from '@/mumble/api/generated/MumbleApi'

type Props = { initialPosts: MumblePost[] }

function getPostEventSource() {
  return new EventSource(`${process.env.NEXT_PUBLIC_API_URL}/posts/_sse`)
}

export default function PostsList({ initialPosts }: Props) {
  const loaderDiv = useRef<HTMLDivElement>(null)
  const [posts, setPosts] = useState<MumblePost[]>(initialPosts)
  const [canFetchMore, setCanFetchMore] = useState<boolean>(true)
  const [isLoaderInViewport, setIsInViewport] = useState<boolean>(false)
  const [loading, setLoading] = useState(false)
  const translate = useTranslations('mumble-post')

  useEffect(() => {
    const onScroll = () => {
      if (isInViewport(loaderDiv as RefObject<HTMLDivElement>)) {
        setIsInViewport(true)
      } else {
        setIsInViewport(false)
      }
    }
    window.addEventListener('scroll', onScroll)

    const events = getPostEventSource()
    events.addEventListener('postCreated', (event: MessageEvent<string>) => {
      const post = JSON.parse(event.data) as MumblePost
      setPosts((prev) => [post, ...prev])
      toast(translate('new-posts'), {
        action: {
          label: translate('see-now'),
          onClick: () => window.scrollTo(0, 0),
        },
      })
    })
    return () => {
      window.removeEventListener('scroll', onScroll)
      events.close()
    }
  }, [])

  useEffect(() => {
    if (isLoaderInViewport && !loading) {
      setLoading(true)
      fetchPosts({ olderThan: posts[posts.length - 1].id, limit: 5 })
        .then(({ data }) => {
          setPosts((prev) => [...prev, ...data!])
          if (!data?.length) setCanFetchMore(false)
        })
        .finally(() => {
          setLoading(false)
        })
    }
  }, [isLoaderInViewport])

  const isInViewport = (element: RefObject<HTMLDivElement>) => {
    if (!element.current) return false
    const bounding = element.current.getBoundingClientRect()
    return (
      bounding.top >= 0 &&
      bounding.left >= 0 &&
      bounding.right <= (window.innerWidth || document.documentElement.clientWidth) &&
      bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight)
    )
  }

  return (
    <>
      {posts!.map((post) => {
        return <Post key={post.id} post={post} />
      })}
      {canFetchMore && (
        <div ref={loaderDiv}>
          <Loader size={'large'} color={'primary'} />
        </div>
      )}
    </>
  )
}
