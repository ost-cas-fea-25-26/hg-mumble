'use client'

import { deletePost } from '@/actions/posts/deletePost'
import { Modal } from '@/lib/hg-storybook'
import { Button, Cross, Loader, Tick } from 'hg-storybook'
import { useState } from 'react'
import { toast } from 'sonner'
import { useTranslations } from 'use-intl'

interface Props {
  postId: string
  onClose: () => void
  onSuccess: () => void
}

export default function PostDeleteModal({ postId, onClose, onSuccess }: Props) {
  const translate = useTranslations('mumble-post')
  const [isSaving, setIsSaving] = useState(false)

  const handleDelete = async () => {
    setIsSaving(true)
    try {
      await deletePost(postId)
      toast.success(translate('delete-success'))
      onSuccess()
    } catch {
      toast.error(translate('delete-error'))
    }
    setIsSaving(false)
  }

  return (
    <Modal onClose={onClose} title={translate('delete-title')}>
      <div className="flex flex-col gap-4 p-4">
        <p>{translate('delete-confirmation')}</p>
        <div className="flex gap-4">
          <Button variant="secondary" width="w-full" onClick={onClose}>
            <span className="flex items-center gap-2">
              {translate('close')}
              <Cross size="xs" color="white" />
            </span>
          </Button>
          <Button variant="primary" width="w-full" onClick={handleDelete}>
            {isSaving ? (
              <Loader size="small" color="white" />
            ) : (
              <span className="flex items-center gap-2">
                {translate('delete')}
                <Tick size="xs" color="white" />
              </span>
            )}
          </Button>
        </div>
      </div>
    </Modal>
  )
}
