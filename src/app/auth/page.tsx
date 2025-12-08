import AuthLayout from '@/app/auth/layout'
import { redirect } from 'next/navigation'
import { ReactNode } from 'react'

export default async function Page() {
  redirect('/auth/signin')
}

Page.getLayout = function getLayout(page: ReactNode) {
  return <AuthLayout>{page}</AuthLayout>
}
