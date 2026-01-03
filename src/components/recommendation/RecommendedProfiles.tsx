import { fetchUsers } from '@/actions/users/fetchUsers'
import { fetchFollowees } from '@/actions/users/followers/fetchFollowees'
import { fetchFollowers } from '@/actions/users/followers/fetchFollowers'
import RecommendationsList from '@/components/recommendation/RecommendedProfilesList'
import { getSession } from '@/lib/auth'
import { User } from '@/mumble/api/generated/MumbleApi'

export default async function RecommendedProfiles() {
  const currentUserId = await getSession().then((session) => session?.user?.sub)

  let recommendations: User[] = []

  try {
    const [followersReq, followeesReq, allUsersReq] = await Promise.all([
      fetchFollowers(currentUserId!),
      fetchFollowees(currentUserId!),
      fetchUsers({ offset: 0, limit: 30 }),
    ])

    const followers = followersReq.data || []
    const followees = followeesReq.data || []
    const allUsers = allUsersReq.data || []

    const excludedIds = new Set(followees.map((u: User) => u.id))
    excludedIds.add(currentUserId)

    const priorityRecommendations = followers.filter((user: User) => {
      return !excludedIds.has(user.id)
    })

    priorityRecommendations.forEach((u: User) => excludedIds.add(u.id))

    const fillerRecommendations = allUsers.filter((user: User) => {
      return !excludedIds.has(user.id)
    })
    recommendations = [...priorityRecommendations, ...fillerRecommendations]
  } catch (error) {
    console.error('Failed to calculate recommendations', error)
    return <div>Error loading recommendations.</div>
  }

  if (recommendations.length === 0) {
    return <div>No recommendations available.</div>
  }

  return (
    <section>
      <h3 className="text-3xl font-bold text-slate-600 mb-4">Empfohlene User</h3>
      <RecommendationsList initialUsers={recommendations} />
    </section>
  )
}
