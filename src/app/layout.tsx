import Header from '@/components/Header'
import 'hg-storybook/style'
import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { ReactNode } from 'react'
import { Toaster } from 'sonner'
import './globals.css'

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
          <section className={'flex items-center justify-center pt-2'}>
            <div
              className={
                'desktop:max-w-[680px]! mb-24 flex h-fit w-full max-w-full flex-col items-center justify-center gap-2 rounded-md p-6'
              }
            >
              {children}
            </div>
          </section>
        </body>
      </NextIntlClientProvider>
    </html>
  )
}
