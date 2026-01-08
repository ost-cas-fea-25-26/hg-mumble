import { fetchComments } from '@/actions/posts/comments/fetchComments'
import { fetchPost } from '@/actions/posts/fetchPost'
import CreateReply from '@/components/post/create/CreateReply'
import PostDetail from '@/components/post/PostDetail'
import ReplyList from '@/components/post/reply/ReplyList'
import { getSession } from '@/lib/auth'
import { ReplyPaginatedResult } from '@/mumble/api/generated/MumbleApi'

interface Props {
  params: Promise<{
    id: string
  }>
}

export default async function Page({ params }: Props) {
  const postId = (await params).id
  const [post, repliesData, session] = await Promise.all([fetchPost(postId), fetchComments(postId), getSession()])

  const replies = repliesData as ReplyPaginatedResult

  return (
    <div className="my-28 w-full rounded-md bg-white">
      {post && <PostDetail post={post} userId={session?.user.sub} />}
      <div className="p-6">
        <CreateReply postId={postId} />
        <ReplyList initialReplies={replies.data || []} />
      </div>
    </div>
  )
}
