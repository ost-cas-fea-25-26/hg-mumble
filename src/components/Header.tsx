import HeaderTitle from '@/components/HeaderTitle'
import HeaderUserDetails from '@/components/HeaderUserDetails'
import NetworkStatusManager from '@/components/NetworkStatusManager'

export default async function Header() {
  return (
    <header className={'bg-primary flex h-20 items-center justify-around text-white'}>
      <HeaderTitle />
      <HeaderUserDetails />
      <NetworkStatusManager />
    </header>
  )
}
