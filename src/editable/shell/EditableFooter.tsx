'use client'

import Link from 'next/link'
import { ArrowRight, Radio } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { globalContent } from '@/editable/content/global.content'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'

export function EditableFooter() {
  const year = new Date().getFullYear()
  const { session, logout } = useEditableLocalAuthSession()
  const columns = globalContent.footer?.columns || []

  return (
    <footer className="relative mt-auto overflow-hidden border-t border-[var(--editable-border)] bg-[var(--slot4-panel-bg)] text-[var(--slot4-page-text)]">
      <div className="beacon-hatch pointer-events-none absolute inset-0 opacity-70" />
      <div className="relative mx-auto w-full max-w-[var(--editable-container)] px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_.7fr_.7fr_.9fr]">
          <div>
            <Link href="/" className="flex items-center gap-2.5">
             
                <img src="/favicon.ico" alt="Wiremints" className="h-8 w-8" />
          
              <span className="editorial-brand text-2xl font-extrabold">{SITE_CONFIG.name}</span>
            </Link>
            <p className="mt-6 max-w-sm text-sm leading-7 text-[var(--slot4-muted-text)]">{globalContent.footer?.description || SITE_CONFIG.description}</p>
            <form action="/signup" className="mt-7 flex max-w-sm overflow-hidden rounded-full border border-[var(--editable-border)] bg-white p-1">
              <input name="email" type="email" placeholder="Email for distribution updates" className="min-w-0 flex-1 bg-transparent px-4 text-sm outline-none placeholder:text-[var(--slot4-soft-muted-text)]" />
              <button className="rounded-full bg-[var(--slot4-accent)] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[var(--slot4-accent-strong)]">Join</button>
            </form>
          </div>

          {columns.map((column) => (
            <div key={column.title}>
              <h3 className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-[var(--slot4-soft-muted-text)]">{column.title}</h3>
              <div className="mt-5 grid gap-3">
                {column.links.map((link) => (
                  <Link key={`${column.title}-${link.href}-${link.label}`} href={link.href} className="text-sm font-semibold text-[var(--slot4-muted-text)] transition hover:text-[var(--slot4-accent)]">{link.label}</Link>
                ))}
              </div>
            </div>
          ))}

          <div>
            <h3 className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-[var(--slot4-soft-muted-text)]">Account</h3>
            <div className="mt-5 grid gap-3">
              {session ? (
                <>
                  <Link href="/create" className="group inline-flex items-center justify-between text-sm font-semibold text-[var(--slot4-muted-text)] transition hover:text-[var(--slot4-accent)]">Publish<ArrowRight className="h-4 w-4" /></Link>
                  <button onClick={logout} className="inline-flex items-center justify-between text-left text-sm font-semibold text-[var(--slot4-muted-text)] transition hover:text-[var(--slot4-accent)]">Logout<ArrowRight className="h-4 w-4" /></button>
                </>
              ) : (
                <>
                  <Link href="/login" className="group inline-flex items-center justify-between text-sm font-semibold text-[var(--slot4-muted-text)] transition hover:text-[var(--slot4-accent)]">Log in<ArrowRight className="h-4 w-4" /></Link>
                  <Link href="/signup" className="group inline-flex items-center justify-between text-sm font-semibold text-[var(--slot4-muted-text)] transition hover:text-[var(--slot4-accent)]">Get started<ArrowRight className="h-4 w-4" /></Link>
                </>
              )}
              <Link href="/contact" className="group inline-flex items-center justify-between text-sm font-semibold text-[var(--slot4-muted-text)] transition hover:text-[var(--slot4-accent)]">Support<ArrowRight className="h-4 w-4" /></Link>
            </div>
          </div>
        </div>

        <p className="mt-12 max-w-4xl border-t border-[var(--editable-border)] pt-8 text-xs leading-6 text-[var(--slot4-soft-muted-text)]">
          {SITE_CONFIG.name} is a media distribution platform. Coverage, pickups, and reach figures are indicative and depend on the participating outlets and syndication partners. Distributing a release does not guarantee publication by any specific outlet.
        </p>
      </div>

      <div className="relative border-t border-[var(--editable-border)]">
        <div className="mx-auto flex w-full max-w-[var(--editable-container)] flex-col items-center justify-between gap-3 px-4 py-6 text-xs font-semibold text-[var(--slot4-soft-muted-text)] sm:flex-row sm:px-6 lg:px-8">
          <span>© {year} {SITE_CONFIG.name}. {globalContent.footer?.bottomNote}</span>
          <span>{globalContent.site?.tagline}</span>
        </div>
      </div>
    </footer>
  )
}
