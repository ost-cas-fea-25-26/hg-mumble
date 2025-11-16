import { MumblePost } from '@/mumble/api/posts/createPost'
import useSWR from 'swr'
import { getUser } from '@/mumble/api/users/getUser'

export default function Post({ post }: { post: MumblePost }) {
  const { data } = useSWR('user', () => getUser(post.creator))
  console.log(data)
  return (
    <div className="border">
      {post.text && <p>{post.text}</p>}
      <div className="flex">
        <div className="mr-2">{post.likeCount ?? 0} likes</div>
        <div>{post.replyCount ?? 0} replies</div>
      </div>
    </div>
  )
}
