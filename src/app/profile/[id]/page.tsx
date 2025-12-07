import { fetchUser } from '@/actions/users/fetchUser'
import ProfileHeader from '@/components/profile/ProfileHeader'
import { Tab, TabGroup, TabList, TabPanel } from 'hg-storybook'
import { redirect } from 'next/navigation'
import { getSession } from '@/lib/auth'

type Props = {
  params: Promise<{ id: string }>
}

export default async function PublicProfilePage({ params }: Props) {
  const { id } = await params
  const user = await fetchUser(id)
  const session = await getSession()

  if (session?.user.sub === id) {
    redirect('/profile')
  }

  if (!user) {
    return <div className="p-10 font-bold">User not found</div>
  }

  return (
    <section className="mt-4 w-full">
      <ProfileHeader user={user} />
    </section>
  )
}
