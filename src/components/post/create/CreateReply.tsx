'use client'
import { createReply } from '@/actions/posts/comments/createReply'
import { fetchUser } from '@/actions/users/fetchUser'
import LoadingText from '@/components/loading/LoadingText'
import MumbleForm from '@/components/post/create/MumbleForm'
import { FormValues } from '@/interfaces/MumbleFormValues'
import { useSession } from '@/lib/auth-client'
import { Avatar, Link, Profile } from '@/lib/hg-storybook'
import { User } from '@/mumble/api/generated/MumbleApi'
import clsx from 'clsx'
import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

interface Props {
  postId: string
}

export default function CreateReply({ postId }: Props) {
  const sessionData = useSession()
  const [showModal, setShowModal] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [userData, setUserData] = useState<User>({})

  useEffect(() => {
    if (sessionData.data) {
      // @ts-ignore error in swagger file
      fetchUser(sessionData.data.user.sub).then((response) => {
        setUserData(response)
        setIsLoading(false)
      })
    }
  }, [sessionData])

  const methods = useForm<FormValues>()
  const userDetails = sessionData.data?.user || { image: null }

  const handleSubmit = ({ text }: FormValues) => {
    setIsSaving(true)
    createReply(postId, text, file!).then((res) => {
      methods.reset({ text: '' })
      setFile(null)
      setIsSaving(false)
    })
  }

  return (
    <div
      className={clsx(
        'relative flex min-h-48 w-full flex-col justify-around gap-2 rounded-md bg-white pt-10 pr-4 pb-4 pl-4'
      )}
    >
      <div className="flex h-16 w-full items-center justify-start gap-3">
        <Avatar src={userDetails?.image || undefined} size={'s'} borderless />
        <div>
          <h3 className={clsx('text-lg font-bold')}>
            {isLoading ? <LoadingText width={'w-32 mb-1'} /> : `${userData?.firstname} ${userData?.lastname}`}
          </h3>
          <div className={clsx('flex items-center gap-4')}>
            <Link url={`/mumble/profile`} className={'text-primary flex items-center justify-start gap-1 font-bold'}>
              {isLoading ? (
                <LoadingText width={'w-25'} />
              ) : (
                <>
                  <Profile color={'currentColor'} size={'xs'} />
                  <span>{userData?.username}</span>
                </>
              )}
            </Link>
          </div>
        </div>
      </div>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(handleSubmit)} className={clsx('h-full')}>
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
