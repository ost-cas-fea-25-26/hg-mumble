'use server'

import { getZitadelApi } from '@/actions/getZitadelApi'
import { UserSettingsFormValues } from '@/components/UserSettingsModal'
import { getSession } from '@/lib/auth'

export const updateUser = async (updatedUser: UserSettingsFormValues) => {
  const { firstName, lastName } = updatedUser
  const sessionData = await getSession()
  const response = await getZitadelApi().updateUser(`/v2/users/${sessionData?.user.sub}`, {
    human: {
      profile: {
        givenName: firstName?.trim(),
        familyName: lastName?.trim(),
      },
    },
  })
  return await response.json()
}
