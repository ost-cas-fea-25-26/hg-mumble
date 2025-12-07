import Header from '@/components/Header'
import LoginAside from '@/components/LoginAside'
import 'hg-storybook/style'
import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import React, { ReactNode } from 'react'
import { Toaster } from 'sonner'
import { getSession } from '@/lib/auth'
import './globals.css'

export const metadata: Metadata = {
  title: 'Mumble - A social media platform for sharing thoughts and ideas.',
  description: 'A social media platform for sharing thoughts and ideas.',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  const { session } = (await getSession()) || {}
  return (
    <html lang="de" className="min-h-screen">
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
          {session ? (
            // logged in
            <>
              <Header />
              <section className={'flex items-center justify-center bg-blue-100'}>
                <div
                  className={
                    'desktop:max-w-[680px]! flex h-fit min-h-screen w-full max-w-full flex-col items-center justify-center gap-2 rounded-md'
                  }
                >
                  {children}
                </div>
              </section>
            </>
          ) : (
            // not logged in
            <section className={'h-screen w-screen bg-blue-100'}>
              <section
                className={
                  'desktop:flex-row flex h-full w-full flex-col items-center justify-around bg-linear-(--gradient-80-40)'
                }
              >
                <div className={'desktop:h-full h-fit w-1/2 p-4 sm:hidden'}>
                  <LoginAside />
                </div>
                <div className={'desktop:w-1/2 h-full w-full p-4'}>
                  <div className={'flex h-full items-center justify-center rounded-md bg-white'}>
                    <div className="flex flex-col items-center justify-center">{children}</div>
                  </div>
                </div>
              </section>
            </section>
          )}
        </body>
      </NextIntlClientProvider>
    </html>
  )
}
