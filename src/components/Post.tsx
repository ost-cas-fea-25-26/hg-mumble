import { MumblePost } from '@/mumble/api/posts/createPost'

export default function Post({ post }: { post: MumblePost }) {
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
