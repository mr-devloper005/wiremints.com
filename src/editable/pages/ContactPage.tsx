'use client'

import { Clock, FileText, Mail, Megaphone, ShieldCheck } from 'lucide-react'
import { pagesContent } from '@/editable/content/pages.content'
import { EditableContactLeadForm } from '@/editable/components/EditableContactLeadForm'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { editableDesignContract as dc, editablePalette as pal } from '@/editable/layouts/design-contract'

const desks = [
  { icon: FileText, title: 'Editorial desk', body: 'Send story ideas, embargoes, source material, and publication questions.' },
  { icon: Megaphone, title: 'Media partnerships', body: 'Discuss distribution, syndication, newsroom collaborations, and campaigns.' },
  { icon: Mail, title: 'General support', body: 'Reach the team for account, publishing, or platform help.' },
]

const trust = [
  { icon: Clock, title: 'Fast response', body: 'Most messages get a reply within one business day.' },
  { icon: ShieldCheck, title: 'Real humans', body: 'No bots — your request is routed to the right desk.' },
]

export default function ContactPage() {
  const contact = pagesContent.contact
  return (
    <EditableSiteShell>
      <main className={`${pal.pageBg} ${pal.pageText}`}>
        <section className="relative overflow-hidden">
          <div className="pointer-events-none absolute -right-40 -top-40 h-[32rem] w-[32rem] rounded-full bg-[var(--slot4-accent)] opacity-[0.09] blur-[130px]" />
          <div className={`relative ${dc.shell.section} pb-6 pt-16 text-center sm:pt-20`} data-reveal>
            <p className={`${dc.type.eyebrow} ${pal.accentText}`}>{contact.eyebrow}</p>
            <h1 className={`mx-auto mt-4 max-w-4xl ${dc.type.heroTitle}`}>{contact.title}</h1>
            <p className={`mx-auto mt-5 max-w-2xl text-base leading-8 ${pal.mutedText} sm:text-lg`}>{contact.description}</p>
          </div>
        </section>

        <section className={`${dc.shell.section} grid gap-8 pb-20 lg:grid-cols-[0.85fr_1.15fr]`}>
          <aside className="space-y-4" data-reveal>
            {desks.map((desk) => (
              <div key={desk.title} className={`rounded-3xl border ${pal.border} ${pal.surfaceBg} p-6 ${pal.shadow}`}>
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--slot4-accent-soft)] text-[var(--slot4-accent)]"><desk.icon className="h-5 w-5" /></span>
                <h2 className="beacon-display mt-4 text-lg font-extrabold tracking-[-0.02em]">{desk.title}</h2>
                <p className={`mt-2 text-sm leading-7 ${pal.mutedText}`}>{desk.body}</p>
              </div>
            ))}
            <div className="grid gap-4 sm:grid-cols-2">
              {trust.map((item) => (
                <div key={item.title} className="rounded-3xl border border-[var(--editable-border)] bg-[var(--slot4-panel-bg)] p-5">
                  <item.icon className="h-5 w-5 text-[var(--slot4-accent)]" />
                  <h3 className="mt-3 text-sm font-extrabold">{item.title}</h3>
                  <p className={`mt-1 text-xs leading-6 ${pal.softMutedText}`}>{item.body}</p>
                </div>
              ))}
            </div>
          </aside>

          <div className={`rounded-[2rem] border ${pal.border} ${pal.surfaceBg} p-6 ${pal.shadow} sm:p-10`} data-reveal>
            <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-[var(--slot4-accent-strong)]">Send a message</p>
            <h2 className="beacon-display mt-3 text-3xl font-extrabold tracking-[-0.02em]">{contact.formTitle}</h2>
            <EditableContactLeadForm />
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
