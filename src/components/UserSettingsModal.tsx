import { updateAvatar } from '@/actions/users/updateAvatar'
import { updateUser } from '@/actions/users/updateUser'
import { updateAvatar as updateAvatarZitadel } from '@/actions/zitadel/updateAvatar'
import { updateUser as updateZitadelUser } from '@/actions/zitadel/updateUser'
import InfoMessage from '@/components/general/InfoMessage'
import { signOut, useSession } from '@/lib/auth-client'
import { MAX_NAME_LENGTH } from '@/utils/form/validation/constants'
import clsx from 'clsx'
import { Avatar, Button, Field, FileInput, Input, Label, Loader, Modal } from 'hg-storybook'
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
  const { firstName, lastName, sub } = sessionData?.user || {}
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

  const [avatar, setAvatar] = useState<File | null>(null)

  const updateUserSettings = (values: UserSettingsFormValues) => {
    setLoading(true)
    const promises: Promise<any>[] = []
    let message = ''
    if (avatar) {
      message += translate('avatar')
      promises.push(updateAvatarZitadel(avatar), updateAvatar(avatar))
    }
    if (values.firstName !== firstName || values.lastName !== lastName) {
      if (message.length) message += ` & `
      message += translate('name')
      promises.push(updateUser(values.firstName, values.lastName), updateZitadelUser(values))
    }
    return Promise.allSettled(promises).then((res) => {
      close()
      setLoading(false)
      const status = res.map((res) => res.status)
      if (status.every((s) => s === 'fulfilled')) {
        router.push('/auth/signin')
        toast.message(translate('edit-success', { data: message }))
        return signOut()
      }
      toast.error(translate('edit-error'))
    })
  }

  return (
    <Modal title={translate('usersettings')} onClose={close}>
      <FormProvider {...formProps}>
        <form className={'flex flex-col gap-2'} onSubmit={formProps.handleSubmit(updateUserSettings)}>
          <h2 className={'mb-1 inline-block font-semibold text-slate-700'}>{translate('avatar')}</h2>
          {avatar ? (
            <div>
              <div className={clsx('flex items-center flex-col')}>
                <Avatar
                  src={URL.createObjectURL(avatar)}
                  size={'xl'}
                  editButton={true}
                  onEdit={() => setAvatar(null)}
                />
              </div>
            </div>
          ) : (
            <FileInput
              label={translate('edit-avatar')}
              description={translate('avatar-input-accepted-images')}
              size={'small'}
              files={[]}
              onDrop={([file]) => {
                setAvatar(file)
              }}
              setFiles={([file]) => {
                setAvatar(file)
              }}
            />
          )}
          <Field>
            <Label htmlFor="firstName">{translate('firstName')}</Label>
            <Input {...register('firstName', validateName)} error={errors.firstName?.message} />
          </Field>
          <Field>
            <Label htmlFor="lastName">{translate('lastName')}</Label>
            <Input {...register('lastName', validateName)} error={errors.lastName?.message} />
          </Field>
          <InfoMessage>{translate('hint-logout')}</InfoMessage>
          <Button disabled={!isValid} type={'submit'}>
            {loading ? <Loader size={'small'} color={'white'} /> : translate('save')}
          </Button>
        </form>
      </FormProvider>
    </Modal>
  )
}
