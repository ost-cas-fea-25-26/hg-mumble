import { getAccessToken } from '@/lib/auth'

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { accessToken } = (await getAccessToken()) || {}
  if (!accessToken) return
  const body = await req.formData()
  const id = await params.then((id) => id)
  console.log('updating user with id: ', id)
  console.log('updating user data: ', body)
  const res = await fetch(`${process.env.ZITADEL_API_URL}/users/${id.id}`, {
    body: body.get('userData'),
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
  console.log(res.status)
  const responseData = await res.json()
  console.log(responseData)
  return Response.json({ id })
}
