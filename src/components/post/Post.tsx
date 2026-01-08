'use client'
import PostButtons from '@/components/post/PostButtons'
import PostContent from '@/components/post/PostContent'
import PostDeleteModal from '@/components/post/modal/PostDeleteModal'
import PostEditModal from '@/components/post/modal/PostEditModal'
import { Avatar, Edit, Link, Profile, Time, Trash } from '@/lib/hg-storybook'
import { Post as MumblePost } from '@/mumble/api/generated/MumbleApi'
import { useFormattedDate } from '@/utils/dates/useFormattedDate'
import { getAvatarInitials } from '@/utils/getAvatarInitials'
import clsx from 'clsx'
import { useState } from 'react'
import { decodeTime } from 'ulidx'

interface Props {
  post: MumblePost
  detailView?: boolean
  userId?: string
  onDeleted?: () => void
}

interface EditedPost {
  text: string
  mediaUrl?: string
}

export default function Post({ post, detailView, userId, onDeleted }: Props) {
  const date = useFormattedDate(new Date(decodeTime(post.id!)))
  const avatarPlaceholderText = getAvatarInitials(post.creator?.displayName || post.creator?.username)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [editedPost, setEditedPost] = useState<EditedPost | null>(null)

  const displayText = editedPost?.text ?? post.text
  const displayMediaUrl = editedPost ? editedPost.mediaUrl : post.mediaUrl

  const handleEditSuccess = (text: string, mediaUrl?: string) => {
    setEditedPost({ text, mediaUrl })
    setEditModalOpen(false)
  }

  const handleDeleteSuccess = () => {
    setDeleteModalOpen(false)
    onDeleted?.()
  }

  return (
    <div className="relative flex min-h-48 w-full flex-col justify-around gap-2 rounded-md bg-white p-4" id={post.id}>
      {userId === post.creator?.id && (
        <div className="absolute top-4 right-4 flex gap-2">
          <button
            onClick={() => setEditModalOpen(true)}
            className="text-secondary hover:text-primary cursor-pointer rounded-full p-2 hover:not-data-disabled:bg-primary-50"
          >
            <Edit size="s" color="currentColor" className="size-[20px]" />
          </button>
          <button
            onClick={() => setDeleteModalOpen(true)}
            className="text-secondary hover:text-primary cursor-pointer rounded-full p-2 hover:not-data-disabled:bg-primary-50"
          >
            <Trash size="s" color="currentColor" className="size-[20px]" />
          </button>
        </div>
      )}
      <div className="desktop:h-16 flex w-full items-center justify-start gap-3">
        <div className="absolute top-6 -left-6">
          <Avatar src={post.creator?.avatarUrl || undefined} placeholderText={avatarPlaceholderText} size={'m'} />
        </div>
        <div className="pl-6">
          <h3 className={clsx('text-lg font-bold')}>{post.creator?.displayName}</h3>
          <div className="desktop:flex-row desktop:items-center desktop:gap-4 desktop:w-full flex flex-col gap-2">
            <Link
              data-testid="post-author-link"
              url={`/mumble/profile/${post.creator?.id}`}
              className={'text-primary flex items-center justify-start gap-1 font-bold'}
            >
              <Profile color={'currentColor'} size={'xs'} />
              <span>{post.creator?.username}</span>
            </Link>
            <span className={clsx('text-secondary-400 flex items-center gap-2 font-semibold')}>
              <Time size={'xs'} color={'currentColor'} />
              <span>{date}</span>
            </span>
          </div>
        </div>
      </div>
      <div className="desktop:mt-0 mt-4 mx-6">
        <PostContent text={displayText} mediaUrl={displayMediaUrl} />
      </div>
      <PostButtons post={post} detailView={detailView} />
      {deleteModalOpen && (
        <PostDeleteModal postId={post.id!} onClose={() => setDeleteModalOpen(false)} onSuccess={handleDeleteSuccess} />
      )}
      {editModalOpen && (
        <PostEditModal
          post={post}
          currentText={displayText || ''}
          currentMediaUrl={displayMediaUrl || undefined}
          onClose={() => setEditModalOpen(false)}
          onSuccess={handleEditSuccess}
        />
      )}
    </div>
  )
}
