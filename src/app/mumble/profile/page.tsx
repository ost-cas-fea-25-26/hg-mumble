import { fetchPosts } from '@/actions/posts/fetchPosts'
import { fetchUser } from '@/actions/users/fetchUser'
import PostsList from '@/components/post/PostsList'
import ProfileHeader from '@/components/profile/ProfileHeader'
import clsx from 'clsx'
import { Tab, TabGroup, TabList, TabPanel } from 'hg-storybook'
import { getTranslations } from 'next-intl/server'
import { getSession } from '@/lib/auth'

export default async function ProfileIndex() {
  const session = await getSession()
  const translate = await getTranslations('general')

  if (!session?.user?.sub) {
    return (
      <section className="flex h-[50vh] items-center justify-center font-bold text-red-600">
        Please log in to view your profile.
      </section>
    )
  }

  const userId = session.user.sub

  const [user, myMumbles, myLikes] = await Promise.all([
    fetchUser(userId),
    fetchPosts({ creators: [userId], limit: 10 }),
    fetchPosts({ likedBy: [userId], limit: 10 }),
  ])

  if (!user) {
    return (
      <section className="flex h-[50vh] items-center justify-center font-bold text-red-600">
        User profile not found.
      </section>
    )
  }

  return (
    <section className="my-6 w-full">
      <ProfileHeader user={user} />

      <div className="mt-8">
        <TabGroup>
          <TabList>
            <Tab>{'Deine Mumbles'}</Tab>
            <Tab>{'Deine Likes'}</Tab>
          </TabList>

          <TabPanel className="mt-4 flex flex-col gap-4">
            <PostsList initialPosts={myMumbles.data || []} filters={{ creatorIds: [userId] }} />
          </TabPanel>

          <TabPanel className="mt-4 flex flex-col gap-4">
            <PostsList initialPosts={myLikes.data || []} filters={{ likedByUserId: userId }} />
          </TabPanel>
        </TabGroup>
      </div>
    </section>
  )
}
