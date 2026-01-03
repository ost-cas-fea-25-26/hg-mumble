import { FormValues } from '@/interfaces/MumbleFormValues'
import { useSession } from '@/lib/auth-client'
import { Button, Cross, FileInput, Modal, Textarea } from '@/lib/hg-storybook'
import { useKeyPress } from 'ahooks'
import clsx from 'clsx'
import { Loader } from 'hg-storybook'
import { useRef } from 'react'
import { useFormContext } from 'react-hook-form'
import { useTranslations } from 'use-intl'

interface Props {
  file: File | null
  setFile: (file: File | null) => void
  showModal: boolean
  setShowModal: (show: boolean) => void
  handleSubmit: ({ text }: FormValues) => void
  isSaving: boolean
}

export default function MumbleForm({ file, setFile, showModal, setShowModal, handleSubmit, isSaving }: Props) {
  const { register, watch } = useFormContext<FormValues>()
  const translate = useTranslations('mumble-post')
  const sessionData = useSession()
  const { ref, ...rest } = register('text')
  const textRef = useRef<HTMLTextAreaElement>(null)

  useKeyPress(['meta.enter'], () => {
    if (document.activeElement === textRef.current && !isSaving) {
      handleSubmit({ text: watch('text') })
    }
  })

  return (
    <div>
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
        <Textarea
          {...rest}
          className={'h-40 w-fit'}
          ref={(e) => {
            ref(e)
            textRef.current = e
          }}
        />
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
      <div className={'desktop:flex-row desktop:gap-4 flex w-full flex-col items-center justify-center gap-2'}>
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
        <Button type="submit" width={'w-full'} disabled={!sessionData || isSaving || !watch('text')}>
          {isSaving ? (
            <span className="min-h-5">
              <Loader size="small" color="white" />
            </span>
          ) : (
            `${translate('save')}`
          )}
        </Button>
      </div>
    </div>
  )
}
