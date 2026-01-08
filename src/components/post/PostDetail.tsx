'use client'

import Post from '@/components/post/Post'
import { Post as MumblePost } from '@/mumble/api/generated/MumbleApi'
import { useRouter } from 'next/navigation'

interface Props {
  post: MumblePost
  userId?: string
}

export default function PostDetail({ post, userId }: Props) {
  const router = useRouter()

  const handleDeleted = () => {
    router.push('/mumble')
  }

  return <Post post={post} detailView userId={userId} onDeleted={handleDeleted} />
}
