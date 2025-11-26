'use client'
import { fetcherMutation } from '@/methods/data/fetcher'
import { Button, Loader, Textarea, Upload } from 'hg-storybook'
import React, { useState } from 'react'
import useSWR from 'swr'
import useSWRMutation from 'swr/mutation'
import { useTranslations } from 'use-intl'

type Props = {
  postId: string
}

export default function PostComments({ postId }: Props) {
  const [text, setText] = useState('')
  const translate = useTranslations('mumble-post')

  const { data: replies } = useSWR(`/api/posts/${postId}/replies`, fetchReplies)
  console.log(replies)
  //replies currently unavailable -> zitadel problems
  const {
    trigger: createCommentForPost,
    isMutating,
    data,
    error,
  } = useSWRMutation(`api/posts/${postId}`, createComment)
  return (
    <>
      {data && <span className={'text-green-700'}>{translate('comment-success')}</span>}
      {error && <span className={'text-red-700'}>{translate('comment-error')}</span>}
      <Textarea onChange={(ev) => setText(ev.currentTarget.value)} />
      <div className={'flex w-full justify-end gap-2'}>
        <Button
          size={'small'}
          variant={'secondary'}
          onClick={() => {
            //todo: show file upload modal to upload image to reply
          }}
        >
          <span className={'text-sm'}>{translate('add-image')}</span>
          <Upload size={'xs'} color={'currentColor'} />
        </Button>
        <Button size={'small'} variant={'primary'} disabled={!text} onClick={() => createCommentForPost({ text })}>
          {!isMutating ? <span className={'text-sm'}>{translate('save-reply')}</span> : null}
          {isMutating && <Loader color={'white'} size={'small'} />}
        </Button>
      </div>
    </>
  )
}
