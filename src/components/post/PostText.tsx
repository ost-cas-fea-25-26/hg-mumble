import { JSX, useMemo } from 'react'

interface Props {
  text: string
}

const hashtagRegex = /#[a-zA-Z0-9_äöüÄÖÜß-]+/g

export default function PostText({ text }: Props) {
  const parts = useMemo(() => {
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
    <div className="max-h-60 overflow-y-auto">
      <p className="max-h-full overflow-auto break-all hyphens-auto" data-testid="post-content">
        {parts}
      </p>
    </div>
  )
}
