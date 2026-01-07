'use client'

import ProfilePreview from '@/components/profile/Preview'
import { User } from '@/mumble/api/generated/MumbleApi'
import { useState } from 'react'

interface Props {
  initialUsers: User[]
}

export default function RecommendationsList({ initialUsers }: Props) {
  const [users, setUsers] = useState<User[]>(initialUsers)
  const visibleUsers = users.slice(0, 6)

  const handleUserFollowed = (followedUserId: string) => {
    setUsers((currentUsers) => currentUsers.filter((u) => u.id !== followedUserId))
  }

  if (visibleUsers.length === 0) {
    return <div>No more recommendations.</div>
  }

  return (
    <div className="grid grid-cols-1 desktop:grid-cols-3 gap-4" data-testid="recommended-profiles">
      {visibleUsers.map((user) => (
        <ProfilePreview key={user.id} user={user} onFollowSuccess={() => handleUserFollowed(user.id as string)} />
      ))}
    </div>
  )
}
