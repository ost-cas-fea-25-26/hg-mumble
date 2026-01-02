import { updateUser } from '@/actions/zitadel/updateUser'
import { signOut, useSession } from '@/lib/auth-client'
import { MAX_NAME_LENGTH } from '@/utils/form/validation/constants'
import { Button, Field, Input, Label, Loader, Modal, SpeechBubble } from 'hg-storybook'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useTranslations } from 'use-intl'

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
    mode: 'all',
    values: {
      firstName: user?.name?.split?.(' ')[0] || '',
      lastName: user?.name?.split?.(' ')[1] || '',
    },
  })

  const router = useRouter()
  const translate = useTranslations('general')
  const {
    register,
    formState: { errors, isValid },
  } = formProps
  if (!sessionData) return null
  const validateName = {
    maxLength: {
      value: MAX_NAME_LENGTH,
      message: translate('max-length', { maxLength: MAX_NAME_LENGTH }),
    },
    pattern: {
      value: /[\p{Script=Latin}\p{M}\p{Zs}\-]+/gu,
      message: translate('invalid-special-characters'),
    },
  }
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
          <Field>
            <Label htmlFor="firstName">{translate('firstName')}</Label>
            <Input {...register('firstName', validateName)} error={errors.firstName?.message} />
          </Field>
          <Field>
            <Label htmlFor="lastName">{translate('lastName')}</Label>
            <Input {...register('lastName', validateName)} error={errors.lastName?.message} />
          </Field>
          <p className={'text-contrast mt-2 mb-2 flex items-center gap-2 text-sm font-semibold'}>
            <SpeechBubble color={'currentColor'} size={'xs'} />
            <span>{translate('hint-logout')}</span>
          </p>
          <Button disabled={!isValid} type={'submit'}>
            {loading ? <Loader size={'small'} color={'white'} /> : translate('save')}
          </Button>
        </form>
      </FormProvider>
    </Modal>
  )
}
