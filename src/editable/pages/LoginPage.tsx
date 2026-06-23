import type { Metadata } from 'next'
import Link from 'next/link'
import { Check, ShieldCheck } from 'lucide-react'
import { buildPageMetadata } from '@/lib/seo'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { EditableLocalLoginForm } from '@/editable/components/EditableLocalAuthForms'
import { pagesContent } from '@/editable/content/pages.content'

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({ path: '/login', title: 'Login', description: pagesContent.auth.login.metadataDescription })
}

const benefits = ['Distribute to 12k+ media outlets', 'Live coverage & pickup tracking', 'Category-targeted syndication']

export default function LoginPage() {
  const login = pagesContent.auth.login
  return (
    <EditableSiteShell>
      <main className="bg-[var(--slot4-page-bg)] text-[var(--slot4-page-text)]">
        <section className="mx-auto grid max-w-[1080px] items-stretch gap-8 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-20">
          {/* brand / benefits panel */}
          <div className="signal-on-dark relative overflow-hidden rounded-[2rem] bg-[var(--slot4-dark-bg)] p-8 text-white sm:p-12" data-reveal>
            <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[var(--slot4-accent)] opacity-40 blur-[90px]" />
            <div className="pointer-events-none absolute -bottom-24 -left-10 h-64 w-64 rounded-full bg-[var(--slot4-accent-2)] opacity-25 blur-[90px]" />
            <div className="relative flex h-full flex-col">
              <span className="inline-flex w-fit items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.16em] text-white/85">{login.badge}</span>
              <h1 className="beacon-display mt-6 max-w-md text-4xl font-extrabold leading-[1.04] tracking-[-0.03em] sm:text-5xl">{login.title}</h1>
              <p className="mt-5 max-w-md text-base leading-8 text-white/70">{login.description}</p>
              <ul className="mt-8 grid gap-3">
                {benefits.map((point) => (
                  <li key={point} className="flex items-center gap-3 text-sm font-semibold text-white/85">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--slot4-accent)] text-white"><Check className="h-4 w-4" /></span>
                    {point}
                  </li>
                ))}
              </ul>
              <p className="mt-auto flex items-center gap-2 pt-8 text-xs font-semibold text-white/55"><ShieldCheck className="h-4 w-4 text-[var(--slot4-accent-2)]" /> Secure access · trusted by 700+ communications teams</p>
            </div>
          </div>

          {/* form panel */}
          <div className="flex flex-col justify-center rounded-[2rem] border border-[var(--editable-border)] bg-white p-7 shadow-[0_24px_70px_rgba(26,20,34,0.08)] sm:p-12" data-reveal>
            <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-[var(--slot4-accent-strong)]">Member access</p>
            <h2 className="beacon-display mt-3 text-3xl font-extrabold tracking-[-0.02em]">{login.formTitle}</h2>
            <EditableLocalLoginForm />
            <p className="mt-6 border-t border-[var(--editable-border)] pt-6 text-sm text-[var(--slot4-muted-text)]">New here? <Link href="/signup" className="font-bold text-[var(--slot4-accent)] underline-offset-4 hover:underline">{login.createCta}</Link></p>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
