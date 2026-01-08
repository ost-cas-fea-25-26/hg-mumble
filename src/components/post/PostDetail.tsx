'use client'

import Post from '@/components/post/Post'
import { Post as MumblePost } from '@/mumble/api/generated/MumbleApi'
import { useRouter } from 'next/navigation'

interface Props {
  post: MumblePost
  userName?: string
}

export default function PostDetail({ post, userName }: Props) {
  const router = useRouter()

  const handleDeleted = () => {
    router.push('/mumble')
  }

  return <Post post={post} detailView userName={userName} onDeleted={handleDeleted} />
}
