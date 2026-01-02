'use client'
import { Button, Eye, Field, Input, Label, Loader } from 'hg-storybook'
import React, { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useTranslations } from 'use-intl'
import { signIn } from '@/lib/auth-client'

export default function Login() {
  const translate = useTranslations('general')
  const formProps = useForm()
  const [type, setType] = useState('password')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    return () => setLoading(false)
  }, [])

  return (
    <div className={'flex flex-col justify-center gap-4'}>
      <h1 className={'text-2xl font-bold'}>{translate('login-title')}</h1>
      <FormProvider {...formProps}>
        <Field>
          <Label htmlFor="email">{translate('username-email')}</Label>
          <Input name="email" />
        </Field>
        <Field>
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
        <form>
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
      </FormProvider>
    </div>
  )
}
