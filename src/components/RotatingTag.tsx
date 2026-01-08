'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface RotatingTagProps {
  words: string
}

export const RotatingTag = ({ words }: RotatingTagProps) => {
  const topics = words
    .split(',')
    .map((w) => w.trim())
    .filter(Boolean)
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % topics.length)
    }, 3500)
    return () => clearInterval(interval)
  }, [topics.length])

  return (
    <span className="inline-grid grid-cols-1 grid-rows-1 overflow-hidden justify-center desktop:align-bottom -mb-1">
      {topics.map((topic) => (
        <span key={topic} className="col-start-1 row-start-1 invisible leading-none pb-1" aria-hidden="true">
          {topic}
          <span className="text-contrast-400">.</span>
        </span>
      ))}

      <span className="col-start-1 row-start-1 z-10">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={topics[index]}
            initial={{ y: '65%', opacity: 0 }}
            animate={{ y: '0%', opacity: 1 }}
            exit={{
              y: '-100%',
              opacity: 0,
              transition: {
                y: { duration: 0.65, ease: 'easeIn' },
                opacity: { duration: 0.5, ease: 'easeIn' },
              },
            }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="text-contrast-100 block whitespace-nowrap text-left leading-none pb-1"
          >
            {topics[index]}
            <span className="text-contrast-400">.</span>
          </motion.span>
        </AnimatePresence>
      </span>
    </span>
  )
}
