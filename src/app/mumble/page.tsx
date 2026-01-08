import { fetchPosts } from '@/actions/posts/fetchPosts'
import { fetchFollowees } from '@/actions/users/followers/fetchFollowees'
import PageHeader from '@/components/general/PageHeader'
import PostsList from '@/components/post/PostsList'
import CreatePost from '@/components/post/create/CreatePost'
import { getSession } from '@/lib/auth'
import { User } from '@/mumble/api/generated/MumbleApi'
import { Tab, TabGroup, TabList, TabPanel } from 'hg-storybook'
import { getTranslations } from 'next-intl/server'
import { redirect } from 'next/navigation'

export default async function Home() {
  const sessionData = await getSession()
  const translate = await getTranslations('general')

  if (!sessionData?.session || !sessionData?.user?.sub) {
    redirect('/auth/signin')
  }

  const userId = sessionData.user.sub

  const followeesResponse = await fetchFollowees(userId, { limit: 50 })
  const followeeIds = followeesResponse.data?.map((followee: User) => followee.id) || []

  const [allPosts, feedPosts] = await Promise.all([
    fetchPosts({ limit: 10 }),
    followeeIds.length > 0 ? fetchPosts({ creators: followeeIds, limit: 10 }) : { data: [] },
  ])

  return (
    <div className={'mt-6 flex flex-col gap-4'}>
      <PageHeader />

      {sessionData && <CreatePost sessionData={sessionData} />}

      <TabGroup>
        <TabList>
          <Tab>{translate('all-mumbles')}</Tab>
          <Tab>{translate('my-feed')}</Tab>
        </TabList>

        <TabPanel className="mt-4 flex flex-col gap-4">
          <PostsList initialPosts={allPosts.data || []} />
        </TabPanel>

        <TabPanel className="mt-4 flex flex-col gap-4">
          {followeeIds.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <p className="text-secondary text-lg font-semibold">{translate('no-followees-message')}</p>
              <p className="text-secondary mt-2">{translate('start-following-people')}</p>
            </div>
          ) : feedPosts.data && feedPosts.data.length > 0 ? (
            <PostsList initialPosts={feedPosts.data} filters={{ creatorIds: followeeIds }} />
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <p className="text-secondary text-lg font-semibold">{translate('no-posts-from-followees')}</p>
              <p className="text-secondary mt-2">{translate('followees-havent-posted')}</p>
            </div>
          )}
        </TabPanel>
      </TabGroup>
    </div>
  )
}
