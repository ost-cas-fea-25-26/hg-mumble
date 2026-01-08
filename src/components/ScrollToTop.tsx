'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useRef } from 'react'

/*
 * This component scrolls the window to the top on navigation.
 * This is used because the scroll={true} prop on Link does not.
 *
 * TODO: Find a better way to handle this.
 **/

export function ScrollToTop() {
  const pathname = usePathname()
  const isFirstRender = useRef(true)

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant',
    })
  }, [pathname])

  return null
}
