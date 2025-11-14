import useSWR from 'swr'

export default function useProfile() {
  return useSWR('/profile')
}
