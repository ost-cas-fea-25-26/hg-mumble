import { ScrollToTop } from '@/components/ScrollToTop'
import 'hg-storybook/style'
import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { ReactNode } from 'react'
import { Toaster } from 'sonner'

type Props = { children: ReactNode }

export const metadata: Metadata = {
  title: 'Mumble - A social media platform for sharing thoughts and ideas.',
  description: 'A social media platform for sharing thoughts and ideas.',
}

export default async function RootLayout({ children }: Props) {
  return (
    <html lang="de">
      <body className={`antialiased`}>
        <div className={`h-screen min-h-screen`}>
          <NextIntlClientProvider>
            <Toaster
              toastOptions={{
                duration: 10000,
                style: {
                  backgroundColor: 'var(--color-primary-200)',
                  borderColor: 'var(--color-primary-400)',
                },
                actionButtonStyle: {
                  backgroundColor: 'var(--color-primary-600)',
                  color: 'white',
                },
                closeButton: true,
              }}
            />
            <ScrollToTop />
            {children}
          </NextIntlClientProvider>
        </div>
      </body>
    </html>
  )
}
