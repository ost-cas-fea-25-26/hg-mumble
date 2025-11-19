import { getMumbleApi } from '@/mumble/api/getMumbleApi'

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const id = await params.then(({ id }) => id)
  const api = await getMumbleApi()
  return await api.users.usersControllerGetById(id, {})
}
