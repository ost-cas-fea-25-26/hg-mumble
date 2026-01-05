'use server'

export async function login(loginName: string): Promise<Response> {
  console.log(loginName)
  const response = await fetch(`${process.env.ZITADEL_API_URL}/v2/sessions`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${''}`,
    },
    body: JSON.stringify({
      checks: {
        user: {
          loginName,
        },
      },
    }),
  })
  console.log(response.status)
  console.log(response)
  return response
}
