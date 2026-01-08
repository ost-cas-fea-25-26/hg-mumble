import { fetchComments } from '@/actions/posts/comments/fetchComments'
import { fetchPost } from '@/actions/posts/fetchPost'
import CreateReply from '@/components/post/create/CreateReply'
import PostDetail from '@/components/post/PostDetail'
import ReplyList from '@/components/post/reply/ReplyList'
import { ReplyPaginatedResult } from '@/mumble/api/generated/MumbleApi'
import { redirect } from 'next/navigation'

interface Props {
  params: Promise<{
    id: string
  }>
}

export default async function Page({ params }: Props) {
  const postId = (await params).id
  const post = await fetchPost(postId)

  if (!post) {
    redirect('/mumble/post/not-found')
  }

  const repliesData = await fetchComments(postId)
  const replies = repliesData as ReplyPaginatedResult

  return (
    <div className="my-28 w-full rounded-md bg-white">
      <PostDetail post={post} />
      <div className="p-6">
        <CreateReply postId={postId} />
        <ReplyList initialReplies={replies.data || []} />
      </div>
    </div>
  )
}
