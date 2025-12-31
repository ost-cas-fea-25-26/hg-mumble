import { updateUser } from '@/actions/zitadel/updateUser'
import { Button, Field, Input, Label, Loader, Modal, SpeechBubble } from 'hg-storybook'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useTranslations } from 'use-intl'
import { authClient, signOut, useSession } from '@/lib/auth-client'

type Props = {
  close: () => void
}

export type UserSettingsFormValues = {
  firstName: string
  lastName: string
}

export default function UserSettingsModal({ close }: Props) {
  const [loading, setLoading] = useState(false)
  const { data: sessionData } = useSession()
  const user = sessionData?.user
  const formProps = useForm<UserSettingsFormValues>({
    values: {
      firstName: user?.name?.split?.(' ')[0] || '',
      lastName: user?.name?.split?.(' ')[1] || '',
    },
  })

  const router = useRouter()
  const translate = useTranslations('general')
  const { register } = formProps
  if (!sessionData) return null
  return (
    <Modal title={translate('usersettings')} onClose={close}>
      <FormProvider {...formProps}>
        <form
          className={'flex flex-col gap-2'}
          onSubmit={formProps.handleSubmit((values) => {
            setLoading(true)
            //@ts-ignore
            return updateUser(user.sub, values).then(async () => {
              router.push('/auth/signin')
              return await signOut()
            })
          })}
        >
          <Field {...register('firstName')}>
            <Label htmlFor="firstName">{translate('firstName')}</Label>
            <Input name="firstName" />
          </Field>
          <Field {...register('lastName')}>
            <Label htmlFor="lastName">{translate('lastName')}</Label>
            <Input name="lastName" />
          </Field>
          <p className={'text-contrast mt-2 mb-2 flex items-center gap-2 text-sm font-semibold'}>
            <SpeechBubble color={'currentColor'} size={'xs'} />
            <span>{translate('hint-logout')}</span>
          </p>
          <Button type={'submit'}>{loading ? <Loader size={'small'} color={'white'} /> : translate('save')}</Button>
        </form>
      </FormProvider>
    </Modal>
  )
}
