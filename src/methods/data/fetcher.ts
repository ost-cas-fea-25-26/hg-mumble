// src/methods/data/fetcher.ts

type FetcherArgs = {
  url: string
  method?: string
  query?: Record<string, any>
  pathParams?: Record<string, string | number>
  body?: any
  headers?: Record<string, string>
}

export default async function fetcher(args: FetcherArgs): Promise<any> {
  return () => {
    let url = args.url

    if (args.pathParams) {
      Object.entries(args.pathParams).forEach(([k, v]) => {
        url = url.replace(`{${k}}`, encodeURIComponent(String(v)))
      })
    }

    if (args.query) {
      const params = new URLSearchParams()
      Object.entries(args.query).forEach(([k, v]) => {
        if (v !== undefined) params.append(k, String(v))
      })
      url += `?${params.toString()}`
    }

    const fetchOptions: RequestInit = {
      method: args.method?.toUpperCase() || 'GET',
      headers: args.headers,
      body: args.body ? JSON.stringify(args.body) : undefined,
    }

    const res = await fetch(url, fetchOptions)
    if (!res.ok) throw new Error(res.statusText)
    return res.json()
  }
}
