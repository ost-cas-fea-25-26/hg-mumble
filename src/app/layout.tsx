import Header from '@/components/Header'
import getFetcher from '@/utils/getFetcher'
import 'hg-storybook/style'
import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { Geist, Geist_Mono } from 'next/font/google'
import { ReactNode } from 'react'
import { Toaster } from 'sonner'
import { SWRConfig } from 'swr'
import './globals.css'

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
            fetcher: getFetcher,
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
            <Header />
            {children}
          </body>
        </SWRConfig>
      </NextIntlClientProvider>
    </html>
  )
}
