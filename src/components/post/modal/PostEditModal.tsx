'use client'

import { editPost } from '@/actions/posts/editPost'
import MumbleForm from '@/components/post/create/MumbleForm'
import { FormValues } from '@/interfaces/MumbleFormValues'
import { Modal } from '@/lib/hg-storybook'
import { Post } from '@/mumble/api/generated/MumbleApi'
import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { useTranslations } from 'use-intl'

interface Props {
  post: Post
  currentText: string
  currentMediaUrl?: string
  onClose: () => void
  // eslint-disable-next-line no-unused-vars
  onSuccess: (text: string, mediaUrl?: string) => void
}

export default function PostEditModal({ post, currentText, currentMediaUrl, onClose, onSuccess }: Props) {
  const translate = useTranslations('mumble-post')
  const [showModal, setShowModal] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [existingMediaUrl, setExistingMediaUrl] = useState<string | undefined>(currentMediaUrl)

  const formProps = useForm<FormValues>({
    defaultValues: {
      text: currentText,
    },
  })

  const handleSubmit = async ({ text }: FormValues) => {
    if (text) {
      setIsSaving(true)
      try {
        const formData = new FormData()
        formData.append('text', text)
        if (file) {
          formData.append('media', file)
        }
        await editPost(post.id!, formData)
        toast.success(translate('edit-success'))
        const newMediaUrl = file ? URL.createObjectURL(file) : existingMediaUrl
        onSuccess(text, newMediaUrl)
      } catch {
        toast.error(translate('edit-error'))
      }
      setIsSaving(false)
    }
  }

  const handleRemoveExistingMedia = () => {
    setExistingMediaUrl(undefined)
  }

  return (
    <Modal onClose={onClose} title={translate('edit-title')}>
      <div className="flex flex-col gap-4 p-4">
        <FormProvider {...formProps}>
          <form onSubmit={formProps.handleSubmit(handleSubmit)}>
            <MumbleForm
              setShowModal={setShowModal}
              file={file}
              setFile={setFile}
              showModal={showModal}
              handleSubmit={handleSubmit}
              isSaving={isSaving}
              existingMediaUrl={existingMediaUrl}
              onRemoveExistingMedia={handleRemoveExistingMedia}
            />
          </form>
        </FormProvider>
      </div>
    </Modal>
  )
}
