import HeaderTitle from '@/components/HeaderTitle'
import HeaderUserDetails from '@/components/HeaderUserDetails'

export default async function Header() {
  return (
    <header className={'bg-primary flex h-20 items-center justify-around text-white'}>
      <HeaderTitle />
      <HeaderUserDetails />
    </header>
  )
}
