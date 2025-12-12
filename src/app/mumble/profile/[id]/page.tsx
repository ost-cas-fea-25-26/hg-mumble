import { fetchPosts } from '@/actions/posts/fetchPosts'
import { fetchUser } from '@/actions/users/fetchUser'
import PostsList from '@/components/post/PostsList'
import ProfileHeader from '@/components/profile/ProfileHeader'
import { redirect } from 'next/navigation'
import { getSession } from '@/lib/auth'

type Props = {
  params: Promise<{ id: string }>
}

export default async function PublicProfilePage({ params }: Props) {
  const { id } = await params
  const user = await fetchUser(id)
  const session = await getSession()

  const [mumbles] = await Promise.all([fetchPosts({ creators: [user.id], limit: 10 })])

  if (session?.user.sub === id) {
    redirect('/mumble/profile')
  }

  if (!user) {
    return <div className="p-10 font-bold">User not found</div>
  }

  return (
    <section className="my-6 w-full">
      <ProfileHeader user={user} />
      <div className="flex flex-col gap-4">
        <PostsList initialPosts={mumbles.data || []} filters={{ creatorIds: [user.id] }} />
      </div>
    </section>
  )
}
