'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

/**
 * Global scroll-reveal driver. Watches every [data-reveal] element and adds
 * `.is-visible` when it scrolls into view (fade/slide/zoom defined in CSS).
 * Re-scans on every route change (usePathname dep) and watches for cards that
 * mount a tick later (MutationObserver), so client-side navigations and async
 * lists — e.g. the archive grid — never get stuck invisible at opacity:0.
 */
export function EditableMotion() {
  const pathname = usePathname()

  useEffect(() => {
    if (typeof window === 'undefined') return

    const hasIO = 'IntersectionObserver' in window
    const io = hasIO
      ? new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                entry.target.classList.add('is-visible')
                io?.unobserve(entry.target)
              }
            })
          },
          { threshold: 0.05, rootMargin: '0px 0px -5% 0px' },
        )
      : null

    const scan = () => {
      document.querySelectorAll<HTMLElement>('[data-reveal]:not(.is-visible)').forEach((el) => {
        if (io) io.observe(el)
        else el.classList.add('is-visible')
      })
    }

    scan()
    const raf = window.requestAnimationFrame(scan)
    const t = window.setTimeout(scan, 400)
    // Safety net: if anything is still hidden after the page settles, show it.
    const fallback = window.setTimeout(() => {
      document.querySelectorAll<HTMLElement>('[data-reveal]:not(.is-visible)').forEach((el) => {
        const rect = el.getBoundingClientRect()
        if (rect.top < window.innerHeight) el.classList.add('is-visible')
      })
    }, 1600)

    // Catch cards rendered after async data loads / streaming.
    const mo = new MutationObserver(scan)
    mo.observe(document.body, { childList: true, subtree: true })

    return () => {
      io?.disconnect()
      mo.disconnect()
      window.cancelAnimationFrame(raf)
      window.clearTimeout(t)
      window.clearTimeout(fallback)
    }
  }, [pathname])

  return null
}

/** Thin gradient bar that tracks page scroll progress. Used on long reads. */
export function ReadingProgressBar() {
  const [width, setWidth] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement
      const max = doc.scrollHeight - doc.clientHeight
      setWidth(max > 0 ? Math.min(100, (doc.scrollTop / max) * 100) : 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return <div className="beacon-progress" style={{ width: `${width}%` }} aria-hidden="true" />
}
