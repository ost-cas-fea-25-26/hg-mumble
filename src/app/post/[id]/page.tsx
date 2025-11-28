import { fetchPost } from '@/actions/posts/fetchPost'
import Post from '@/components/Post'

interface Props {
  params: Promise<{
    id: string
  }>
}

export default async function Page({ params }: Props) {
  const postId = (await params).id
  const post = await fetchPost(postId)

  return <div>{post && <Post post={post} />}</div>
}
