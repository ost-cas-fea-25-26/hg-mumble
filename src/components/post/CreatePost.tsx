'use client'

import { createPost } from '@/actions/posts/createPost'
import MumbleForm from '@/components/post/MumbleForm'
import { FormValues } from '@/interfaces/MumbleFormValues'
import clsx from 'clsx'
import React, { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useTranslations } from 'use-intl'
import { useSession } from '@/lib/auth-client'
import { Avatar } from '@/lib/hg-storybook'

export default function CreatePost() {
  const sessionData = useSession()
  const [showModal, setShowModal] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const translate = useTranslations('mumble-post')

  const formProps = useForm<FormValues>()
  const userDetails = sessionData.data?.user || { image: null }

  const handleSubmit = ({ text }: FormValues) => {
    setIsSaving(true)
    createPost(text, file!).then((res) => {
      formProps.reset({ text: '' })
      setFile(null)
      setIsSaving(false)
    })
  }
  return (
    <div
      className={clsx(
        'relative flex min-h-48 w-full flex-col justify-around gap-2 rounded-md bg-white pt-22 pr-4 pb-4 pl-4'
      )}
    >
      <div className="absolute top-4 left-[-32] flex h-16 w-full items-center justify-start gap-3">
        <Avatar src={userDetails?.image || undefined} size={'m'} />
        <h3 className={clsx('text-lg font-bold')}>{translate('create-post-title')}</h3>
      </div>
      <FormProvider {...formProps}>
        <form onSubmit={formProps.handleSubmit(handleSubmit)} className={clsx('h-full')}>
          <MumbleForm
            setShowModal={setShowModal}
            file={file}
            setFile={setFile}
            showModal={showModal}
            handleSubmit={handleSubmit}
            isSaving={isSaving}
          />
        </form>
      </FormProvider>
    </div>
  )
}
