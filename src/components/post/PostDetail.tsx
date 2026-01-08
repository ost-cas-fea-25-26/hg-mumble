'use client'

import Post from '@/components/post/Post'
import { Post as MumblePost } from '@/mumble/api/generated/MumbleApi'
import { useRouter } from 'next/navigation'

interface Props {
  post: MumblePost
}

export default function PostDetail({ post }: Props) {
  const router = useRouter()

  const handleDeleted = () => {
    router.push('/mumble')
  }

  return <Post post={post} detailView onDeleted={handleDeleted} />
}
