import type { Metadata } from 'next'
import Link from 'next/link'
import { Check, Rocket } from 'lucide-react'
import { buildPageMetadata } from '@/lib/seo'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { EditableLocalSignupForm } from '@/editable/components/EditableLocalAuthForms'
import { pagesContent } from '@/editable/content/pages.content'

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({ path: '/signup', title: 'Sign up', description: pagesContent.auth.signup.metadataDescription })
}

const perks = ['Launch your first release in minutes', 'Targeted journalist & newsroom delivery', 'Verified pickups and live reach tracking', 'No setup fees — start free']

export default function SignupPage() {
  const signup = pagesContent.auth.signup
  return (
    <EditableSiteShell>
      <main className="bg-[var(--slot4-page-bg)] text-[var(--slot4-page-text)]">
        <section className="mx-auto grid max-w-[1080px] items-stretch gap-8 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-20">
          {/* form panel */}
          <div className="order-2 flex flex-col justify-center rounded-[2rem] border border-[var(--editable-border)] bg-white p-7 shadow-[0_24px_70px_rgba(26,20,34,0.08)] sm:p-12 lg:order-1" data-reveal>
            <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-[var(--slot4-accent-strong)]">Create account</p>
            <h1 className="beacon-display mt-3 text-3xl font-extrabold tracking-[-0.02em]">{signup.formTitle}</h1>
            <EditableLocalSignupForm />
            <p className="mt-6 border-t border-[var(--editable-border)] pt-6 text-sm text-[var(--slot4-muted-text)]">Already have an account? <Link href="/login" className="font-bold text-[var(--slot4-accent)] underline-offset-4 hover:underline">{signup.loginCta}</Link></p>
          </div>

          {/* benefits panel */}
          <div className="signal-on-dark relative order-1 overflow-hidden rounded-[2rem] bg-[var(--slot4-dark-bg)] p-8 text-white sm:p-12 lg:order-2" data-reveal>
            <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[var(--slot4-accent)] opacity-40 blur-[90px]" />
            <div className="pointer-events-none absolute -bottom-24 -left-10 h-64 w-64 rounded-full bg-[var(--slot4-accent-2)] opacity-25 blur-[90px]" />
            <div className="relative flex h-full flex-col">
              <span className="inline-flex w-fit items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.16em] text-white/85"><Rocket className="h-3.5 w-3.5 text-[var(--slot4-accent-2)]" /> {signup.badge}</span>
              <h2 className="beacon-display mt-6 max-w-md text-4xl font-extrabold leading-[1.04] tracking-[-0.03em] sm:text-5xl">{signup.title}</h2>
              <p className="mt-5 max-w-md text-base leading-8 text-white/70">{signup.description}</p>
              <ul className="mt-8 grid gap-3">
                {perks.map((point) => (
                  <li key={point} className="flex items-center gap-3 text-sm font-semibold text-white/85">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--slot4-accent)] text-white"><Check className="h-4 w-4" /></span>
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
