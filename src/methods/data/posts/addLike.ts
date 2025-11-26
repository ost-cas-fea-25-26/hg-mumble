export async function addLike(url: string) {
  return await fetch(url, {
    method: 'PUT',
  })
}
