import { getTranslations } from 'next-intl/server'

interface UselessFactResponse {
  id: string
  text: string
  source: string
  source_url: string
  language: string
  permalink: string
}

export const getRandomQuote = async (): Promise<string> => {
  try {
    const response = await fetch('https://uselessfacts.jsph.pl/random.json?language=de', {
      next: { revalidate: 86400 },
    })

    if (!response.ok) {
      throw new Error('Response was not ok.')
    }

    const data: UselessFactResponse = await response.json()
    return data.text
  } catch (error) {
    console.error('Failed to fetch random quote:', error)
    const t = await getTranslations('general')
    return t('header-subtitle')
  }
}
