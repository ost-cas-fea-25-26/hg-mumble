'use client'

import { useEffect } from 'react'

export default function NetworkStatusManager() {
  useEffect(() => {
    window.addEventListener('load', () => {
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js', { scope: '/' })
      }
    })
  }, [])
  return <></>
}
