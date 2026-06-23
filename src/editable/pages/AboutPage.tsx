import Link from 'next/link'
import { ArrowRight, Compass, Sparkles, Target } from 'lucide-react'
import { pagesContent } from '@/editable/content/pages.content'
import { editableDesignContract as dc, editablePalette as pal } from '@/editable/layouts/design-contract'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'

export default function AboutPage() {
  const about = pagesContent.about
  const stats = pagesContent.home.hero.stats
  const [missionPara, visionPara] = about.paragraphs

  return (
    <EditableSiteShell>
      <main className={`${pal.pageBg} ${pal.pageText}`}>
        {/* hero */}
        <section className="relative overflow-hidden">
          <div className="pointer-events-none absolute -right-40 -top-40 h-[34rem] w-[34rem] rounded-full bg-[var(--slot4-accent)] opacity-[0.09] blur-[130px]" />
          <div className={`relative ${dc.shell.section} pb-8 pt-16 text-center sm:pt-20`} data-reveal>
            <p className={`${dc.type.eyebrow} ${pal.accentText}`}>{about.badge}</p>
            <h1 className={`mx-auto mt-4 max-w-4xl ${dc.type.heroTitle}`}>{about.title}</h1>
            <p className={`mx-auto mt-5 max-w-2xl text-base leading-8 ${pal.mutedText} sm:text-lg`}>{about.description}</p>
          </div>
        </section>

        {/* impact stats band */}
        <section className={dc.shell.section}>
          <div className="grid gap-4 rounded-[2rem] border border-[var(--editable-border)] bg-white p-8 shadow-[0_14px_40px_rgba(26,20,34,0.07)] sm:grid-cols-2 lg:grid-cols-4" data-reveal>
            {stats.map((stat) => (
              <div key={stat.label} className="text-center sm:text-left">
                <p className="beacon-display text-3xl font-extrabold tracking-[-0.03em] text-[var(--slot4-accent)] sm:text-4xl">{stat.value}</p>
                <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--slot4-soft-muted-text)]">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* mission + vision */}
        <section className={`${dc.shell.section} ${dc.shell.sectionY}`}>
          <div className="grid gap-6 lg:grid-cols-2">
            <div className={`rounded-3xl border ${pal.border} ${pal.surfaceBg} p-8 ${pal.shadow}`} data-reveal>
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--slot4-accent-soft)] text-[var(--slot4-accent)]"><Target className="h-6 w-6" /></span>
              <h2 className="beacon-display mt-5 text-2xl font-extrabold tracking-[-0.02em]">Our mission</h2>
              <p className={`mt-3 text-base leading-8 ${pal.mutedText}`}>{missionPara}</p>
            </div>
            <div className={`rounded-3xl border ${pal.border} ${pal.surfaceBg} p-8 ${pal.shadow}`} data-reveal style={{ ['--reveal-delay' as string]: '90ms' }}>
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--slot4-accent-soft)] text-[var(--slot4-accent)]"><Compass className="h-6 w-6" /></span>
              <h2 className="beacon-display mt-5 text-2xl font-extrabold tracking-[-0.02em]">Our vision</h2>
              <p className={`mt-3 text-base leading-8 ${pal.mutedText}`}>{visionPara || missionPara}</p>
            </div>
          </div>

          {/* why choose us */}
          <div className="mt-16">
            <div className="mx-auto max-w-2xl text-center" data-reveal>
              <p className={`${dc.type.eyebrow} ${pal.accentText}`}>Why choose us</p>
              <h2 className={`mt-3 ${dc.type.sectionTitle}`}>Built for reach, clarity, and proof of coverage.</h2>
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {about.values.map((value, index) => (
                <div key={value.title} data-reveal style={{ ['--reveal-delay' as string]: `${index * 90}ms` }} className={`group rounded-3xl border ${pal.border} ${pal.surfaceBg} p-8 ${pal.shadow} ${dc.motion.lift}`}>
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--slot4-accent-soft)] text-[var(--slot4-accent)] transition group-hover:bg-[var(--slot4-accent)] group-hover:text-white"><Sparkles className="h-5 w-5" /></span>
                  <h3 className="beacon-display mt-5 text-xl font-extrabold tracking-[-0.02em]">{value.title}</h3>
                  <p className={`mt-3 text-sm leading-7 ${pal.mutedText}`}>{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* closing CTA */}
        <section className={`${pal.warmBg} pb-20`}>
          <div className={dc.shell.section}>
            <div className="signal-on-dark relative overflow-hidden rounded-[2rem] bg-[var(--slot4-dark-bg)] px-6 py-14 text-white sm:px-12 lg:px-16" data-reveal>
              <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-[var(--slot4-accent)] opacity-40 blur-[90px]" />
              <div className="relative flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
                <h2 className="beacon-display max-w-2xl text-3xl font-extrabold leading-[1.08] tracking-[-0.03em] sm:text-4xl">Put your next announcement in front of the right newsrooms.</h2>
                <div className="flex flex-wrap gap-3">
                  <Link href="/create" className="inline-flex items-center gap-2 rounded-full bg-[var(--slot4-accent-2)] px-7 py-3.5 text-sm font-bold text-[var(--slot4-dark-bg)] transition hover:-translate-y-0.5">Distribute a release <ArrowRight className="h-4 w-4" /></Link>
                  <Link href="/updates" className="inline-flex items-center gap-2 rounded-full border border-white/25 px-7 py-3.5 text-sm font-bold text-white transition hover:bg-white/10">Browse the newsroom</Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
