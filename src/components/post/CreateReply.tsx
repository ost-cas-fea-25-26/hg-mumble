'use client'
import { createReply } from '@/actions/posts/comments/createReply'
import { createPost } from '@/actions/posts/createPost'
import { fetchUser } from '@/actions/users/fetchUser'
import MumbleForm from '@/components/post/MumbleForm'
import { FormValues } from '@/interfaces/MumbleFormValues'
import clsx from 'clsx'
import React, { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useTranslations } from 'use-intl'
import { useSession } from '@/lib/auth-client'
import { Avatar, Button, Cross, FileInput, Link, Modal, Profile, Textarea, Time } from '@/lib/hg-storybook'
import { User } from '@/mumble/api/generated/MumbleApi'

interface Props {
  postId: string
}

export default function CreateReply({ postId }: Props) {
  const sessionData = useSession()
  const [showModal, setShowModal] = useState(false)
  const [file, setFile] = useState<File | null>(null)

  const [userData, setUserData] = useState<User>({})

  useEffect(() => {
    if (sessionData.data) {
      // @ts-ignore error in swagger file
      fetchUser(sessionData.data.user.sub).then(setUserData)
    }
  }, [sessionData])

  const methods = useForm<FormValues>()
  const userDetails = sessionData.data?.user || { image: null }
  return (
    <div
      className={clsx(
        'relative flex min-h-48 w-full flex-col justify-around gap-2 rounded-md bg-white pt-10 pr-4 pb-4 pl-4'
      )}
    >
      <div className="flex h-16 w-full items-center justify-start gap-3">
        <Avatar src={userDetails?.image || undefined} size={'xs'} />
        <div>
          <h3 className={clsx('text-lg font-bold')}>{`${userData.firstname} ${userData.lastname}`}</h3>
          <div className={clsx('flex items-center gap-4')}>
            <Link url={`/profile`} className={'text-primary flex items-center justify-start gap-1 font-bold'}>
              <Profile color={'currentColor'} size={'xs'} />
              <span>{userData.username}</span>
            </Link>
          </div>
        </div>
      </div>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(({ text }) => {
            createReply(postId, text, file!)
          })}
          className={clsx('h-full')}
        >
          <MumbleForm setShowModal={setShowModal} file={file} setFile={setFile} showModal={showModal} />
        </form>
      </FormProvider>
    </div>
  )
}
