'use client'
import { createPost } from '@/actions/posts/createPost'
import clsx from 'clsx'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslations } from 'use-intl'
import { useSession } from '@/lib/auth-client'
import { Avatar, Button, Cross, FileInput, Modal, Textarea } from '@/lib/hg-storybook'

type FormValues = {
  text: string
}

export default function CreatePost() {
  const sessionData = useSession()
  const [showModal, setShowModal] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const translate = useTranslations('mumble-post')

  const { register, handleSubmit } = useForm<FormValues>()
  const userDetails = sessionData.data?.user || { image: null }
  return (
    <div className="relative m-2 flex min-h-48 w-full flex-col justify-around gap-2 rounded-md bg-white pt-22 pr-4 pb-4 pl-4">
      <div className={clsx('absolute top-4 left-[-32] flex h-16 w-full items-center justify-start gap-3')}>
        {userDetails?.image ? <Avatar src={userDetails?.image} size={'m'} /> : <div className={'w-16'} />}
        <h3 className={clsx('text-lg font-bold')}>{translate('create-post-title')}</h3>
      </div>
      <form
        onSubmit={handleSubmit(({ text }) => {
          createPost(text, file!)
        })}
        className={clsx('h-full')}
      >
        <div className={clsx('mb-4 flex items-center gap-4')}>
          {file && (
            <span className={'relative'}>
              <div className={'absolute top-2 right-2 w-fit'}>
                <Button
                  size={'small'}
                  rounded
                  variant={'secondary'}
                  onClick={() => {
                    setFile(null)
                  }}
                >
                  <Cross color={'white'} size={'xs'} />
                </Button>
              </div>
              <img
                className={'desktop:w-40 desktop:min-w-40 h-40 min-h-40 object-cover'}
                src={URL.createObjectURL(file)}
                alt={'user uploaded file'}
              />
            </span>
          )}
          <Textarea {...register('text')} className={'h-40 w-fit'} />
        </div>
        {showModal && (
          <Modal title={translate('add-image')} onClose={() => setShowModal(false)}>
            <FileInput
              label={translate('file-input-title')}
              description={translate('file-input-accepted-images')}
              size={'large'}
              onDrop={([file]) => {
                setShowModal(false)
                setFile(file)
              }}
              files={[file].filter(Boolean) as File[]}
              setFiles={([file]) => {
                setFile(file)
              }}
              buttonContent={translate('file-upload-button')}
            />
          </Modal>
        )}
        <div className={'flex w-full items-center justify-center gap-4'}>
          <Button
            width={'w-full'}
            variant={'secondary'}
            size={'medium'}
            onClick={() => {
              setShowModal(true)
            }}
          >
            {translate('add-image')}
          </Button>
          <Button type="submit" width={'w-full'} disabled={!sessionData}>
            {translate('save')}
          </Button>
        </div>
      </form>
    </div>
  )
}
