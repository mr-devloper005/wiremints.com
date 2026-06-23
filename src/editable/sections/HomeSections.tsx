import Link from 'next/link'
import type { CSSProperties } from 'react'
import {
  ArrowRight, ArrowUpRight, BadgeCheck, BarChart3, Briefcase, Check, Cpu, Globe2, Heart, Megaphone,
  Newspaper, Quote, Search, Send, Sparkles, Star, TrendingUp,
} from 'lucide-react'
import type { SitePost } from '@/lib/site-connector'
import type { HomeTimeSection } from '@/lib/task-data'
import type { TaskKey } from '@/lib/site-config'
import { pagesContent } from '@/editable/content/pages.content'
import { editableDesignContract as dc, editablePalette as pal } from '@/editable/layouts/design-contract'
import { postHref, RailPostCard } from '@/editable/cards/PostCards'

type HomeSectionProps = {
  primaryTask: TaskKey
  primaryRoute: string
  posts: SitePost[]
  timeSections: HomeTimeSection[]
}

const featureIcons = { send: Send, megaphone: Megaphone, chart: BarChart3 } as const
const categoryIcons = { news: Newspaper, briefcase: Briefcase, megaphone: Megaphone, cpu: Cpu, heart: Heart, globe: Globe2 } as const

function delay(index: number): CSSProperties {
  return { '--reveal-delay': `${(index % 4) * 90}ms` } as CSSProperties
}

/* ============================ HERO (Swipix light hero + CSS product mockup) ============================ */
export function EditableHomeHero({ primaryTask, primaryRoute, posts }: HomeSectionProps) {
  const hero = pagesContent.home.hero
  const list = posts.slice(0, 4)
  const reachBars = [38, 54, 47, 68, 60, 82, 74, 96]

  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute -right-40 -top-40 h-[36rem] w-[36rem] rounded-full bg-[var(--slot4-accent)] opacity-[0.10] blur-[130px]" />
      <div className="pointer-events-none absolute -left-32 top-1/3 h-[28rem] w-[28rem] rounded-full bg-[var(--slot4-accent-2)] opacity-[0.10] blur-[120px]" />

      <div className={`relative ${dc.shell.section} py-16 sm:py-20 lg:py-24`}>
        <div className="grid items-center gap-14 lg:grid-cols-[1.04fr_0.96fr]">
          {/* copy column */}
          <div className="beacon-rise">
            <span className="inline-flex items-center gap-2 rounded-full border border-[var(--editable-border)] bg-white px-4 py-2 text-[11px] font-extrabold uppercase tracking-[0.18em] text-[var(--slot4-accent-strong)] shadow-[0_6px_20px_rgba(26,20,34,0.05)]">
              <Sparkles className="h-3.5 w-3.5 text-[var(--slot4-accent)]" /> {hero.badge}
            </span>
            <h1 className={`mt-7 ${dc.type.heroTitle} text-[var(--slot4-page-text)]`}>
              {hero.title[0]}{' '}
              <span className="bg-[linear-gradient(115deg,#ea580c,#f97316_55%,#f59e0b)] bg-clip-text text-transparent">{hero.title.slice(1).join(' ')}</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-8 text-[var(--slot4-muted-text)] sm:text-lg">{hero.description}</p>

            <form action="/search" className="mt-8 flex max-w-xl items-center gap-2 rounded-full border border-[var(--editable-border)] bg-white p-1.5 shadow-[0_14px_40px_rgba(26,20,34,0.07)]">
              <Search className="ml-3 h-5 w-5 text-[var(--slot4-soft-muted-text)]" />
              <input name="q" placeholder={hero.searchPlaceholder} className="min-w-0 flex-1 bg-transparent px-2 py-2.5 text-sm text-[var(--slot4-page-text)] outline-none placeholder:text-[var(--slot4-soft-muted-text)]" />
              <button className="rounded-full bg-[var(--slot4-accent)] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[var(--slot4-accent-strong)]">Search</button>
            </form>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link href={hero.primaryCta.href} className={dc.button.primary}>{hero.primaryCta.label} <ArrowRight className="h-4 w-4" /></Link>
              <Link href={hero.secondaryCta.href} className={dc.button.secondary}>{hero.secondaryCta.label}</Link>
            </div>

            <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-3 border-t border-[var(--editable-border)] pt-7 sm:gap-x-10">
              {hero.stats.slice(0, 3).map((stat, index) => (
                <div key={stat.label} data-reveal style={delay(index)}>
                  <p className="beacon-display text-2xl font-extrabold tracking-[-0.03em] text-[var(--slot4-page-text)] sm:text-3xl">{stat.value}</p>
                  <p className="mt-0.5 text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--slot4-soft-muted-text)]">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* isometric coverage-dashboard mockup (CSS only, image-free) */}
          <div className="beacon-rise relative" style={{ animationDelay: '120ms' }}>
            <div className="pointer-events-none absolute inset-x-6 -bottom-6 top-10 -z-10 rounded-[2.6rem] bg-[var(--slot4-accent)] opacity-[0.10] blur-2xl" />
            <div className="relative [perspective:1800px]">
              <div className="rounded-[1.9rem] border border-[var(--editable-border)] bg-white p-5 shadow-[0_50px_100px_rgba(26,20,34,0.20)] transition-transform duration-500 [transform:rotateX(6deg)_rotateY(-13deg)_rotateZ(1.5deg)] hover:[transform:rotateX(0deg)_rotateY(0deg)] sm:p-6">
                <div className="flex items-center justify-between border-b border-[var(--editable-border)] pb-4">
                  <span className="inline-flex items-center gap-2 text-sm font-extrabold text-[var(--slot4-page-text)]">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--slot4-accent)] opacity-75" />
                      <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[var(--slot4-accent)]" />
                    </span>
                    {hero.focusLabel}
                  </span>
                  <Link href={primaryRoute} className="text-xs font-bold text-[var(--slot4-accent)] transition hover:text-[var(--slot4-accent-strong)]">View all</Link>
                </div>

                <div className="mt-5 rounded-2xl bg-[var(--slot4-panel-bg)] p-5">
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--slot4-soft-muted-text)]">Audience reach</p>
                      <p className="beacon-display mt-1 text-2xl font-extrabold tracking-[-0.03em] text-[var(--slot4-page-text)]">4.2M <span className="text-sm font-bold text-[var(--slot4-accent)]">+32%</span></p>
                    </div>
                    <span className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1 text-[11px] font-bold text-[var(--slot4-accent-strong)] shadow-[0_4px_12px_rgba(26,20,34,0.06)]"><TrendingUp className="h-3 w-3" /> This week</span>
                  </div>
                  <div className="mt-4 flex h-20 items-end gap-1.5">
                    {reachBars.map((height, index) => (
                      <span key={index} className="flex-1 rounded-t-md" style={{ height: `${height}%`, background: index === reachBars.length - 1 ? 'var(--slot4-accent)' : 'var(--slot4-accent-soft)' }} />
                    ))}
                  </div>
                </div>

                <div className="mt-4 grid gap-1.5">
                  <p className="px-1 text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--slot4-soft-muted-text)]">Latest pickups</p>
                  {list.length ? list.map((post, index) => (
                    <Link key={post.id || post.slug} href={postHref(primaryTask, post, primaryRoute)} className="group flex items-center gap-3 rounded-xl px-2 py-2.5 transition hover:bg-[var(--slot4-accent-soft)]">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--slot4-accent-soft)] text-xs font-extrabold text-[var(--slot4-accent-strong)]">{String(index + 1).padStart(2, '0')}</span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-[11px] font-bold uppercase tracking-[0.1em] text-[var(--slot4-soft-muted-text)]">{(post.content as Record<string, unknown>)?.category as string || 'Newswire'}</span>
                        <span className="block truncate text-sm font-bold leading-snug text-[var(--slot4-page-text)] transition group-hover:text-[var(--slot4-accent-strong)]">{post.title}</span>
                      </span>
                      <ArrowUpRight className="h-4 w-4 shrink-0 text-[var(--slot4-soft-muted-text)] transition group-hover:text-[var(--slot4-accent)]" />
                    </Link>
                  )) : (
                    <p className="rounded-xl bg-[var(--slot4-panel-bg)] px-4 py-7 text-center text-sm text-[var(--slot4-soft-muted-text)]">Fresh releases will appear here as they cross the wire.</p>
                  )}
                </div>
              </div>
            </div>

            <div className="absolute -bottom-5 -left-3 hidden w-60 -rotate-2 rounded-2xl border border-[var(--editable-border)] bg-white p-4 shadow-[0_24px_60px_rgba(26,20,34,0.18)] sm:block">
              <div className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--slot4-accent)] text-white"><BadgeCheck className="h-4 w-4" /></span>
                <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-[var(--slot4-accent-strong)]">{hero.featureCardBadge}</p>
              </div>
              <p className="mt-2 text-xs font-semibold leading-5 text-[var(--slot4-muted-text)]">{hero.featureCardDescription}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ============================ TRUSTED-BY strip + latest releases rail ============================ */
export function EditableStoryRail({ primaryTask, primaryRoute, posts }: HomeSectionProps) {
  const trusted = pagesContent.home.trustedBy
  const railPosts = posts.slice(0, 6)
  return (
    <section className={pal.warmBg}>
      <div className={`${dc.shell.section} py-12`}>
        <div className="text-center" data-reveal>
          <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-[var(--slot4-soft-muted-text)]">{trusted.label}</p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {trusted.logos.map((name) => (
              <span key={name} className="beacon-display text-lg font-extrabold tracking-[-0.03em] text-[var(--slot4-page-text)]/35 transition hover:text-[var(--slot4-page-text)]/70">{name}</span>
            ))}
          </div>
        </div>

        {railPosts.length ? (
          <div className="mt-14">
            <div className="flex items-end justify-between gap-6" data-reveal>
              <div>
                <p className={`${dc.type.eyebrow} ${pal.accentText} flex items-center gap-2`}><TrendingUp className="h-4 w-4" /> Latest on the wire</p>
                <h2 className={`mt-3 ${dc.type.sectionTitle}`}>Freshly distributed releases</h2>
              </div>
              <Link href={primaryRoute} className="hidden items-center gap-2 text-sm font-bold text-[var(--slot4-accent)] transition hover:gap-3 sm:inline-flex">View all <ArrowRight className="h-4 w-4" /></Link>
            </div>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {railPosts.map((post, index) => <RailPostCard key={post.id || post.slug} post={post} href={postHref(primaryTask, post, primaryRoute)} index={index} />)}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  )
}

/* ============================ Centered statement (hatch bg) + features ============================ */
export function EditableMagazineSplit() {
  const statement = pagesContent.home.statement
  const features = pagesContent.home.features
  return (
    <section className="relative overflow-hidden">
      <div className="beacon-hatch absolute inset-0 -z-10" />
      <div className={`${dc.shell.section} ${dc.shell.sectionY}`}>
        <div className="mx-auto max-w-3xl text-center" data-reveal>
          <h2 className={`${dc.type.sectionTitle} text-[var(--slot4-page-text)] sm:text-[3rem]`}>{statement.title}</h2>
          <p className={`mt-5 text-base leading-8 ${pal.mutedText} sm:text-lg`}>{statement.description}</p>
          <Link href={statement.cta.href} className={`${dc.button.primary} mt-8`}>{statement.cta.label} <ArrowRight className="h-4 w-4" /></Link>
        </div>

        <div className="mt-16">
          <div className="mx-auto max-w-2xl text-center" data-reveal>
            <p className={`${dc.type.eyebrow} ${pal.accentText}`}>{features.badge}</p>
            <h3 className={`mt-3 ${dc.type.sectionTitle}`}>{features.title}</h3>
            <p className={`mt-4 text-base leading-8 ${pal.mutedText}`}>{features.description}</p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {features.items.map((item, index) => {
              const Icon = featureIcons[item.icon as keyof typeof featureIcons] || Send
              return (
                <div key={item.title} data-reveal style={delay(index)} className={`group rounded-3xl border ${pal.border} ${pal.surfaceBg} p-8 ${pal.shadow} ${dc.motion.lift}`}>
                  <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--slot4-accent-soft)] text-[var(--slot4-accent)] transition group-hover:bg-[var(--slot4-accent)] group-hover:text-white">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h4 className="beacon-display mt-6 text-xl font-extrabold tracking-[-0.02em]">{item.title}</h4>
                  <p className={`mt-3 text-sm leading-7 ${pal.mutedText}`}>{item.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ============================ Accent card + channels + testimonials ============================ */
export function EditableTimeCollections({ primaryRoute }: HomeSectionProps) {
  const accent = pagesContent.home.accentCard
  const categories = pagesContent.home.categories
  const testimonials = pagesContent.home.testimonials

  return (
    <section className={pal.pageBg}>
      <div className={`${dc.shell.section} ${dc.shell.sectionY}`}>
        {/* accent feature card */}
        <div className="signal-on-dark relative overflow-hidden rounded-[2.2rem] bg-[var(--slot4-dark-bg)] px-6 py-12 text-white sm:px-12 lg:px-16 lg:py-16" data-reveal>
          <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[var(--slot4-accent)] opacity-40 blur-[100px]" />
          <div className="pointer-events-none absolute -bottom-24 left-1/3 h-72 w-72 rounded-full bg-[var(--slot4-accent-2)] opacity-25 blur-[100px]" />
          <div className="relative grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
            <div>
              <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-[var(--slot4-accent-2)]">{accent.eyebrow}</p>
              <h2 className="beacon-display mt-4 max-w-xl text-3xl font-extrabold leading-[1.06] tracking-[-0.03em] sm:text-[2.6rem]">{accent.title}</h2>
              <p className="mt-5 max-w-xl text-base leading-8 text-white/70">{accent.description}</p>
              <Link href={accent.cta.href} className="mt-8 inline-flex items-center gap-2 rounded-full bg-[var(--slot4-accent-2)] px-7 py-3.5 text-sm font-bold text-[var(--slot4-dark-bg)] shadow-[0_14px_34px_rgba(245,158,11,0.3)] transition hover:-translate-y-0.5">{accent.cta.label} <ArrowRight className="h-4 w-4" /></Link>
            </div>
            <ul className="grid gap-3">
              {accent.points.map((point) => (
                <li key={point} className="flex items-center gap-3 rounded-2xl border border-white/12 bg-white/[0.06] px-5 py-4 text-sm font-semibold text-white/85 backdrop-blur">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--slot4-accent)] text-white"><Check className="h-4 w-4" /></span>
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* channels */}
        <div className="mt-20">
          <div className="mx-auto max-w-2xl text-center" data-reveal>
            <p className={`${dc.type.eyebrow} ${pal.accentText}`}>{categories.badge}</p>
            <h2 className={`mt-3 ${dc.type.sectionTitle}`}>{categories.title}</h2>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categories.items.map((item, index) => {
              const Icon = categoryIcons[item.icon as keyof typeof categoryIcons] || Newspaper
              return (
                <Link key={item.slug} href={`${primaryRoute}?category=${item.slug}`} data-reveal style={delay(index)} className={`group flex items-center gap-4 rounded-2xl border ${pal.border} ${pal.surfaceBg} p-5 ${dc.motion.lift}`}>
                  <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[var(--slot4-accent-soft)] text-[var(--slot4-accent)] transition group-hover:scale-110">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-base font-extrabold tracking-[-0.01em] transition group-hover:text-[var(--slot4-accent)]">{item.label}</span>
                    <span className={`block text-xs ${pal.softMutedText}`}>{item.blurb}</span>
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-[var(--slot4-soft-muted-text)] transition group-hover:text-[var(--slot4-accent)]" />
                </Link>
              )
            })}
          </div>
        </div>

        {/* testimonials */}
        <div className="mt-20">
          <div className="mx-auto max-w-2xl text-center" data-reveal>
            <p className={`${dc.type.eyebrow} ${pal.accentText}`}>{testimonials.badge}</p>
            <h2 className={`mt-3 ${dc.type.sectionTitle}`}>{testimonials.title}</h2>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {testimonials.items.map((item, index) => (
              <figure key={item.name} data-reveal style={delay(index)} className={`flex flex-col rounded-3xl border ${pal.border} ${pal.surfaceBg} p-7 ${pal.shadow}`}>
                <Quote className="h-8 w-8 text-[var(--slot4-accent)]" />
                <blockquote className="mt-4 flex-1 text-base leading-7 text-[var(--slot4-page-text)]">“{item.quote}”</blockquote>
                <div className="mt-6 flex items-center gap-3 border-t border-[var(--editable-border)] pt-5">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--slot4-accent-soft)] text-sm font-extrabold text-[var(--slot4-accent-strong)]">{item.name.split(' ').map((part) => part[0]).join('').slice(0, 2)}</span>
                  <div className="min-w-0">
                    <figcaption className="truncate text-sm font-extrabold">{item.name}</figcaption>
                    <p className={`truncate text-xs ${pal.softMutedText}`}>{item.role}</p>
                  </div>
                  <div className="ml-auto flex gap-0.5 text-[var(--slot4-accent-2)]">{Array.from({ length: 5 }).map((_, starIndex) => <Star key={starIndex} className="h-3.5 w-3.5 fill-current" />)}</div>
                </div>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ============================ Closing CTA ============================ */
export function EditableHomeCta() {
  const cta = pagesContent.home.cta
  return (
    <section className={`${pal.warmBg} pb-20`}>
      <div className={dc.shell.section}>
        <div className="relative overflow-hidden rounded-[2rem] border border-[var(--editable-border)] bg-[var(--slot4-panel-bg)] px-6 py-14 text-center sm:px-12 lg:py-20" data-reveal>
          <div className="beacon-dots pointer-events-none absolute inset-0 opacity-60" />
          <div className="relative mx-auto max-w-2xl">
            <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-[var(--slot4-accent-strong)]">{cta.badge}</p>
            <h2 className={`mt-4 ${dc.type.sectionTitle} sm:text-[2.8rem]`}>{cta.title}</h2>
            <p className={`mt-5 text-base leading-8 ${pal.mutedText}`}>{cta.description}</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link href={cta.primaryCta.href} className={dc.button.primary}>{cta.primaryCta.label} <ArrowRight className="h-4 w-4" /></Link>
              <Link href={cta.secondaryCta.href} className={dc.button.secondary}>{cta.secondaryCta.label}</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
