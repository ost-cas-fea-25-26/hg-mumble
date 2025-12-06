'use client'
import { createReply } from '@/actions/posts/comments/createReply'
import { createPost } from '@/actions/posts/createPost'
import { fetchUser } from '@/actions/users/fetchUser'
import clsx from 'clsx'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslations } from 'use-intl'
import { useSession } from '@/lib/auth-client'
import { Avatar, Button, Cross, FileInput, Link, Modal, Profile, Textarea, Time } from '@/lib/hg-storybook'
import { User } from '@/mumble/api/generated/MumbleApi'

type FormValues = {
  text: string
}

interface Props {
  postId?: string
}

export default function CreatePost({ postId }: Props) {
  const sessionData = useSession()
  const [showModal, setShowModal] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const translate = useTranslations('mumble-post')
  const isReply = Boolean(postId)

  const [userData, setUserData] = useState<User>({})

  useEffect(() => {
    if (sessionData.data) {
      // @ts-ignore error in swagger file
      fetchUser(sessionData.data.user.sub).then(setUserData)
    }
  }, [sessionData])

  const { register, handleSubmit } = useForm<FormValues>()
  const userDetails = sessionData.data?.user || { image: null }
  return (
    <div
      className={clsx(
        'relative flex min-h-48 w-full flex-col justify-around gap-2 rounded-md bg-white pr-4 pb-4 pl-4',
        isReply ? 'pt-10' : 'pt-22'
      )}
    >
      <div
        className={clsx(
          'flex h-16 w-full items-center justify-start gap-3',
          isReply ? '' : 'absolute top-4 left-[-32]'
        )}
      >
        {userDetails?.image ? (
          <Avatar src={userDetails?.image} size={isReply ? 'xs' : 'm'} />
        ) : (
          <div className={isReply ? 'w-10' : 'w-16'} />
        )}
        {isReply && sessionData.data ? (
          <div>
            <h3 className={clsx('text-lg font-bold')}>{`${userData.firstname} ${userData.lastname}`}</h3>
            <div className={clsx('flex items-center gap-4')}>
              <Link
                url={`user-profile/${sessionData.data.user.id}`}
                className={'text-primary flex items-center justify-start gap-1 font-bold'}
              >
                <Profile color={'currentColor'} size={'xs'} />
                <span>{userData.username}</span>
              </Link>
            </div>
          </div>
        ) : (
          <h3 className={clsx('text-lg font-bold')}>{translate('create-post-title')}</h3>
        )}
      </div>
      <form
        onSubmit={handleSubmit(({ text }) => {
          if (postId) {
            createReply(postId, text, file!)
          } else {
            createPost(text, file!)
          }
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
