import { getPost } from '@/actions/posts/getPost'
import Post from '@/components/Post'

interface Props {
  params: Promise<{
    id: string
  }>
}

export default async function Page({ params }: Props) {
  const postId = (await params).id
  const post = await getPost(postId)

  return <div>{post && <Post post={post} />}</div>
}
