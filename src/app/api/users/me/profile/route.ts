import { exchangeToken, getAccessToken } from '@/lib/auth'

let data = JSON.stringify({
  human: {
    profile: {
      givenName: 'Minnie',
      familyName: 'Mouse',
      preferredLanguage: 'en',
      gender: 'GENDER_FEMALE',
    },
    email: {
      email: 'patrickbrunner96@hotmail.ch',
    },
  },
})
export async function PATCH(req: Request) {
  const { accessToken } = (await getAccessToken()) || {}
  if (!accessToken) return
  const subjectToken = await exchangeToken({})
  console.log(subjectToken)
  const body = await req.formData()
  const res = await fetch(
    `${process.env.ZITADEL_API_URL}/v2/users/${body.get('id')}`,
    {
      body: data,
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    },
  )
  console.log(res.status)
  const responseData = await res.json()
  console.log(responseData)
  return Response.json({ body })
}
