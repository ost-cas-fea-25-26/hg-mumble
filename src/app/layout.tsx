import React, { ReactNode } from 'react'
import 'hg-storybook/style'

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`h-full antialiased`}>{children}</body>
    </html>
  )
}
