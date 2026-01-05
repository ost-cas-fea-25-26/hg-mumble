'use client'

import { useEffect } from 'react'

type Props = {}

export default function NetworkStatusManager({}: Props) {
  useEffect(() => {
    window.addEventListener('load', () => {
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js', { scope: '/' })
      }
    })
  }, [])
  return <div></div>
}
