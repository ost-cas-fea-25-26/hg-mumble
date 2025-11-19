import useSWR, { Fetcher } from 'swr'

type AcceptedParams = string | string[][] | Record<string, string> | URLSearchParams | undefined

function useApi<T = any>(url: string, params: AcceptedParams, fetcher: Fetcher<T, string>) {
  const usp = new URLSearchParams(params)
  usp.sort()
  return useSWR<T>(`${url}?${usp.toString()}`, fetcher)
}

export default useApi
