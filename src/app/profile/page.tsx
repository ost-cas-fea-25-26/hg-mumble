import { fetchUser } from '@/actions/users/fetchUser'
import ProfileHeader from '@/components/profile/ProfileHeader'
import clsx from 'clsx'
import { Tab, TabGroup, TabList, TabPanel } from 'hg-storybook'
import { getTranslations } from 'next-intl/server'
import { getSession } from '@/lib/auth'

export default async function PersonalProfilePage() {
  const session = await getSession()

  if (!session) {
    return <div className="p-10 font-bold">User not found</div>
  }

  const user = await fetchUser(session.user.sub)
  if (!user) return <div>User not found</div>

  return (
    <section className="mt-4 w-full">
      <ProfileHeader user={user} />
      <TabGroup>
        <TabList>
          <Tab>Deine Mumbles</Tab>
          <Tab>Deine Likes</Tab>
        </TabList>

        <TabPanel className="mt-4">
          <div className="rounded-md bg-white p-4 shadow-sm">My personal mumbles...</div>
        </TabPanel>

        <TabPanel className="mt-4">
          <div className="rounded-md bg-white p-4 shadow-sm">My Liked posts...</div>
        </TabPanel>
      </TabGroup>
    </section>
  )
}
