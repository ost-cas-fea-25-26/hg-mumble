import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import 'hg-storybook/style'
import { SWRConfig } from 'swr'
import fetcher from '@/methods/data/getFetcher'
import { Toaster } from 'sonner'
import { NextIntlClientProvider } from 'next-intl'
import { ReactNode } from 'react'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Mumble - A social media platform for sharing thoughts and ideas.',
  description: 'A social media platform for sharing thoughts and ideas.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html lang="de">
      <NextIntlClientProvider>
        <SWRConfig
          value={{
            fetcher: fetcher,
          }}
        >
          <body className={`h-full antialiased`}>
            <Toaster
              toastOptions={{
                duration: 100000,
                style: {
                  backgroundColor: 'var(--color-primary-200)',
                  borderColor: 'var(--color-primary-400)',
                },
                closeButton: true,
              }}
            />
            {children}
          </body>
        </SWRConfig>
      </NextIntlClientProvider>
    </html>
  )
}
