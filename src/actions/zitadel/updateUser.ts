'use server'

import { UserSettingsFormValues } from '@/components/UserSettingsModal'
import { authHeader } from '@/lib/auth'

export const updateUser = async (id: string, updatedUser: UserSettingsFormValues) => {
  const { firstName, lastName } = updatedUser
  const response = await fetch(process.env.ZITADEL_API_URL + `/v2/users/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({
      human: {
        profile: {
          givenName: firstName?.trim(),
          familyName: lastName?.trim(),
        },
      },
    }),
    headers: {
      ...(await authHeader()),
    },
  })
  return await response.json()
}
