import FsLightbox from 'fslightbox-react'
import Image from 'next/image'
import { JSX, useMemo, useState } from 'react'

interface Props {
  text?: string | null
  mediaUrl?: string | null
}

const hashtagRegex = /#[a-zA-Z0-9_äöüÄÖÜß-]+/g

export default function PostContent({ text, mediaUrl }: Props) {
  const [lightboxOpen, setLightboxOpen] = useState(false)

  const parts = useMemo(() => {
    if (!text) {
      return null
    }

    const result: Array<string | JSX.Element> = []
    let lastIndex = 0

    for (const match of text.matchAll(hashtagRegex)) {
      const start = match.index!
      const end = start + match[0].length

      if (lastIndex < start) {
        result.push(text.slice(lastIndex, start))
      }

      result.push(
        <span key={start} className="text-primary font-bold">
          {match[0]}
        </span>
      )

      lastIndex = end
    }

    if (lastIndex < text.length) {
      result.push(text.slice(lastIndex))
    }

    return result
  }, [text])

  return (
    <div className={'flex flex-col gap-4'}>
      {parts && (
        <div className="max-h-60 overflow-y-auto">
          <p className="max-h-full overflow-auto break-all hyphens-auto" data-testid="post-text">
            {parts}
          </p>
        </div>
      )}
      {mediaUrl && (
        <>
          <FsLightbox
            sources={[<img className={'rounded-md'} src={mediaUrl} alt={'user uploaded file'} key={mediaUrl} />]}
            toggler={lightboxOpen}
          />
          <Image
            className={'w-full object-cover aspect-2/1 rounded-md cursor-pointer'}
            src={mediaUrl}
            alt={'user uploaded file'}
            onClick={() => setLightboxOpen(!lightboxOpen)}
            width={600}
            height={600}
          />
        </>
      )}
    </div>
  )
}
