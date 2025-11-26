'use client'

import { useEffect } from 'react'

interface Props {
  user?: any
}

export default function ProfileHeader({ user }: Props) {
  useEffect(() => {
    console.log(user)
  }, [user])

  return <div></div>
}
