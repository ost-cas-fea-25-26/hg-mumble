import { getApi } from '@/mumble/api/getApi'

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const id = await params.then(({ id }) => id)
  const api = await getApi()
  return await api.users.usersControllerGetById(id, {})
}
