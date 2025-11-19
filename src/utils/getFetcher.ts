'use client'

import { joinURL } from 'ufo'

export default function getFetcher() {
  const baseUrl = process.env.API_URL as string

  return async <JSON = any>(
    path: string,
    init: RequestInit = {},
  ): Promise<JSON> => {
    const response = await fetch(joinURL(baseUrl, path), init)
    if (!response.ok) {
      throw new Error('An error occurred while fetching the data.')
    }

    return (await response.json()) as JSON
  }
}
