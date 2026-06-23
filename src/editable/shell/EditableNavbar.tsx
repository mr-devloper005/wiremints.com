'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LogOut, Menu, PenLine, Radio, Search, UserRound, X } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { globalContent } from '@/editable/content/global.content'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'

export function EditableNavbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { session, logout } = useEditableLocalAuthSession()
  const pathname = usePathname()
  const links = globalContent.nav.primaryLinks

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 14)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const firstName = session?.name?.trim().split(/\s+/)[0] || 'Member'
  const isActive = (href: string) => {
    const base = href.split('?')[0]
    return base !== '/' && pathname?.startsWith(base)
  }

  return (
    <header className={`sticky top-0 z-50 border-b border-[var(--editable-border)] backdrop-blur-xl transition-all duration-300 ${scrolled ? 'bg-white/90 shadow-[0_10px_30px_rgba(26,20,34,0.08)]' : 'bg-white/70'}`}>
      <div className={`mx-auto flex w-full max-w-[var(--editable-container)] items-center justify-between gap-4 px-4 transition-all duration-300 sm:px-6 lg:px-8 ${scrolled ? 'h-[64px]' : 'h-[80px]'}`}>
        <Link href="/" className="group flex items-center gap-2.5">
          
          <img src="/favicon.ico" alt="Wiremints" className="h-8 w-8" />
        
          <span className="editorial-brand max-w-[44vw] truncate text-xl font-extrabold text-[var(--slot4-page-text)] sm:text-2xl">{SITE_CONFIG.name}</span>
        </Link>

        <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-9 lg:flex">
          {links.map((item) => (
            <Link
              key={`${item.label}-${item.href}`}
              href={item.href}
              data-active={isActive(item.href) ? 'true' : undefined}
              className={`beacon-underline text-sm font-semibold transition ${isActive(item.href) ? 'text-[var(--slot4-accent)]' : 'text-[var(--slot4-muted-text)] hover:text-[var(--slot4-accent)]'}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link href="/search" aria-label="Search" className="hidden h-10 w-10 items-center justify-center rounded-full border border-[var(--editable-border)] text-[var(--slot4-muted-text)] transition hover:border-[var(--slot4-accent)] hover:text-[var(--slot4-accent)] sm:inline-flex">
            <Search className="h-4 w-4" />
          </Link>

          {session ? (
            <>
              <span className="hidden items-center gap-2 rounded-full bg-[var(--slot4-accent-soft)] px-4 py-2 text-sm font-bold text-[var(--slot4-accent-strong)] sm:inline-flex">
                <UserRound className="h-4 w-4" /> {firstName}
              </span>
              <button type="button" onClick={logout} className="inline-flex items-center gap-2 rounded-full border border-[var(--editable-border)] px-4 py-2 text-sm font-bold text-[var(--slot4-page-text)] transition hover:border-[var(--slot4-accent-2)] hover:text-[var(--slot4-accent-2)]">
                <LogOut className="h-4 w-4" /> <span className="hidden sm:inline">Logout</span>
              </button>
              <Link href="/create" className="hidden items-center gap-2 rounded-full bg-[var(--slot4-accent)] px-5 py-2.5 text-sm font-bold text-white shadow-[0_10px_24px_rgba(234,88,12,0.28)] transition hover:-translate-y-0.5 hover:bg-[var(--slot4-accent-strong)] sm:inline-flex">
                <PenLine className="h-4 w-4" /> Publish
              </Link>
            </>
          ) : (
            <>
              <Link href="/login" className="hidden text-sm font-bold text-[var(--slot4-page-text)] transition hover:text-[var(--slot4-accent)] sm:inline-flex">Log in</Link>
              <Link href="/signup" className="inline-flex items-center rounded-full bg-[var(--slot4-accent)] px-5 py-2.5 text-sm font-bold text-white shadow-[0_10px_24px_rgba(234,88,12,0.28)] transition hover:-translate-y-0.5 hover:bg-[var(--slot4-accent-strong)]">Get started</Link>
            </>
          )}

          <button type="button" onClick={() => setOpen((value) => !value)} className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--editable-border)] text-[var(--slot4-page-text)] lg:hidden" aria-label="Toggle navigation">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-[var(--editable-border)] bg-white px-4 py-4 lg:hidden">
          <div className="grid gap-1">
            {links.map((item) => (
              <Link key={`m-${item.label}-${item.href}`} href={item.href} onClick={() => setOpen(false)} className="rounded-2xl px-4 py-3 text-sm font-bold text-[var(--slot4-page-text)] transition hover:bg-[var(--slot4-accent-soft)] hover:text-[var(--slot4-accent-strong)]">{item.label}</Link>
            ))}
            <Link href="/search" onClick={() => setOpen(false)} className="rounded-2xl px-4 py-3 text-sm font-bold text-[var(--slot4-page-text)] transition hover:bg-[var(--slot4-accent-soft)]">Search</Link>
            <div className="mt-2 grid gap-2 border-t border-[var(--editable-border)] pt-3">
              {session ? (
                <>
                  <span className="px-4 text-sm font-bold text-[var(--slot4-accent-strong)]">Signed in as {firstName}</span>
                  <Link href="/create" onClick={() => setOpen(false)} className="rounded-full bg-[var(--slot4-accent)] px-4 py-3 text-center text-sm font-bold text-white">Publish</Link>
                  <button type="button" onClick={() => { logout(); setOpen(false) }} className="rounded-full border border-[var(--editable-border)] px-4 py-3 text-sm font-bold text-[var(--slot4-page-text)]">Logout</button>
                </>
              ) : (
                <>
                  <Link href="/login" onClick={() => setOpen(false)} className="rounded-full border border-[var(--editable-border)] px-4 py-3 text-center text-sm font-bold">Log in</Link>
                  <Link href="/signup" onClick={() => setOpen(false)} className="rounded-full bg-[var(--slot4-accent)] px-4 py-3 text-center text-sm font-bold text-white">Get started</Link>
                </>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </header>
  )
}
