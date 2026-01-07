'use server'

import { getZitadelApi } from '@/actions/getZitadelApi'

export const updateAvatar = async (avatar: File) => {
  const api = getZitadelApi()
  const data = new FormData()
  data.append('file', avatar)
  const response = await api.updateAvatar('/assets/v1/users/me/avatar', data, false)
  return response.status
}
