import HeaderButtons from '@/components/HeaderButtons'
import NetworkStatusManager from '@/components/NetworkStatusManager'
import { getSession } from '@/lib/auth'
import { Avatar, Link } from '@/lib/hg-storybook'
import { getTranslations } from 'next-intl/server'

export default async function HeaderUserDetails() {
  const sessionData = await getSession()
  const translate = await getTranslations('general')
  return (
    <>
      {!sessionData ? (
        <Link className={'text-white'} url={'/auth/signin'}>
          {translate('login')}
        </Link>
      ) : (
        <div className={'flex items-center justify-between gap-2'}>
          {sessionData!.user.image && <Avatar size={'s'} src={sessionData!.user.image} />}
          <HeaderButtons />
          <NetworkStatusManager />
        </div>
      )}
    </>
  )
}
