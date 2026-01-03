import { fetchPosts } from '@/actions/posts/fetchPosts'
import { fetchUser } from '@/actions/users/fetchUser'
import { fetchFollowers } from '@/actions/users/followers/fetchFollowers'
import PostsList from '@/components/post/PostsList'
import ProfileFollow from '@/components/profile/Follow'
import ProfileHeader from '@/components/profile/Header'
import { getSession } from '@/lib/auth'
import { User } from '@/mumble/api/generated/MumbleApi'
import { redirect } from 'next/navigation'

type Props = {
  params: Promise<{ id: string }>
}

export default async function PublicProfilePage({ params }: Props) {
  const { id } = await params
  const session = await getSession()
  const currentUserId = session?.user?.sub

  if (currentUserId === id) {
    redirect('/mumble/profile')
  }

  const [user, mumbles, followersData] = await Promise.all([
    fetchUser(id),
    fetchPosts({ creators: [id], limit: 10 }),
    fetchFollowers(id, { limit: 1000 }),
  ])

  if (!user) {
    return <div className="p-10 font-bold">User not found</div>
  }

  const isFollowing = followersData.data?.some((follower: User) => follower.id === currentUserId) || false

  return (
    <section className="my-6 w-full max-w-4xl mx-auto">
      <ProfileHeader user={user} stats={{ followers: followersData.count }} />

      <div className="my-3">
        {currentUserId && (
          <ProfileFollow userId={user.id} userName={user.firstname || user.username} initialIsFollowing={isFollowing} />
        )}
      </div>

      <div className="flex flex-col gap-4">
        <PostsList initialPosts={mumbles.data || []} filters={{ creatorIds: [user.id] }} />
      </div>
    </section>
  )
}
