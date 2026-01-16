'use client'
import InfoMessage from '@/components/general/InfoMessage'
import { signIn } from '@/lib/auth-client'
import { Button, Eye, Field, Input, Label, Loader } from 'hg-storybook'
import { useEffect, useState } from 'react'
import { useTranslations } from 'use-intl'

export default function Login() {
  const translate = useTranslations('general')
  const [type, setType] = useState('password')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    return () => setLoading(false)
  }, [])

  return (
    <div className={'flex flex-col justify-center gap-4'}>
      <h1 className={'text-2xl font-bold'}>{translate('login-title')}</h1>
      <form>
        <Field disabled className={'opacity-50'}>
          <Label htmlFor="email">{translate('username-email')}</Label>
          <Input name="email" />
        </Field>
        <Field disabled className={'opacity-50'}>
          <Label htmlFor="password">{translate('password')}</Label>
          <Input
            name="password"
            type={type}
            iconAction={{
              name: translate('reveal-password'),
              action: () => {
                setType((prev) => (prev === 'password' ? 'text' : 'password'))
              },
            }}
            icon={<Eye color={'var(--color-secondary)'} size={'xs'} />}
          />
        </Field>
        <InfoMessage>{translate('login-unavailable')}</InfoMessage>
        <Button
          variant={'gradient'}
          width={'w-full'}
          size={'medium'}
          onClick={() => {
            setLoading(true)
            signIn()
          }}
          dataTestId="login-button"
        >
          {loading ? <Loader size={'small'} color={'white'} /> : translate('login')}
        </Button>
      </form>
    </div>
  )
}
