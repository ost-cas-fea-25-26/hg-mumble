'use client'
import { signIn, useSession } from '@/lib/auth-client'
import { Button, Eye, Field, Input, Label, Loader } from 'hg-storybook'
import { useState } from 'react'
import { useTranslations } from 'use-intl'

export default function Login() {
  const translate = useTranslations('general')
  const [loading, setLoading] = useState(false)
  useSession()
  return (
    <div className={'flex flex-col justify-center gap-4'}>
      <h1 className={'text-2xl font-bold'}>{translate('login-title')}</h1>
      <form>
        <Field disabled className={'opacity-40'}>
          <Label htmlFor="email">{translate('username-email')}</Label>
          <Input name="email" />
        </Field>
        <Field disabled className={'opacity-40'}>
          <Label htmlFor="password">{translate('password')}</Label>
          <Input name="password" type={'password'} icon={<Eye color={'var(--color-secondary)'} size={'xs'} />} />
        </Field>
      </form>

      <Button
        variant={'gradient'}
        width={'w-full'}
        size={'medium'}
        onClick={() => {
          setLoading(true)
          return signIn()
        }}
        dataTestId="login-button"
      >
        {loading ? <Loader size={'small'} color={'white'} /> : translate('login-button')}
      </Button>
    </div>
  )
}
