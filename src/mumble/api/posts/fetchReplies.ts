export async function fetchReplies(url: string) {
  const res = await fetch(url, { method: 'GET' })
  return res.json()
}
