import { updateUser } from '@/actions/users/updateUser'
import { updateUser as updateZitadelUser } from '@/actions/zitadel/updateUser'
import { signOut, useSession } from '@/lib/auth-client'
import { MAX_NAME_LENGTH } from '@/utils/form/validation/constants'
import { Button, Field, Input, Label, Loader, Modal, SpeechBubble } from 'hg-storybook'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { toast } from 'sonner'
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
  const { firstName, lastName } = sessionData?.user || {}
  const formProps = useForm<UserSettingsFormValues>({
    mode: 'all',
    values: {
      firstName: firstName || '',
      lastName: lastName || '',
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
            return Promise.allSettled([updateUser(values.firstName, values.lastName), updateZitadelUser(values)]).then(
              async ([one, two]) => {
                if ([one.status, two.status].every((s) => s === 'fulfilled')) {
                  router.push('/auth/signin')
                  toast.message(translate('name-change-success'))
                  return await signOut()
                } else {
                  close()
                  toast.error(translate('name-change-failure'))
                }
              }
            )
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
