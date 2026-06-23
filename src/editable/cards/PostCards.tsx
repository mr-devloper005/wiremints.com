import Link from 'next/link'
import type { CSSProperties } from 'react'
import { ArrowUpRight, Clock3, Newspaper } from 'lucide-react'
import type { SitePost } from '@/lib/site-connector'
import type { TaskKey } from '@/lib/site-config'
import { editableDesignContract as dc, editablePalette as pal } from '@/editable/layouts/design-contract'

export function getEditablePostImage(post?: SitePost | null) {
  const media = Array.isArray(post?.media) ? post.media : []
  const mediaUrl = media.find((item) => typeof item?.url === 'string' && item.url)?.url
  const content = post?.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
  const images = Array.isArray(content.images) ? content.images : []
  const contentImage = images.find((value): value is string => typeof value === 'string' && Boolean(value))
  const directImage = ['featuredImage', 'image', 'thumbnail', 'coverImage', 'logo']
    .map((key) => content[key])
    .find((value): value is string => typeof value === 'string' && Boolean(value))
  return mediaUrl || directImage || contentImage || '/placeholder.svg?height=900&width=1400'
}

export function getEditableExcerpt(post?: SitePost | null, limit = 150) {
  const content = post?.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
  const raw =
    (typeof content.description === 'string' && content.description) ||
    (typeof content.summary === 'string' && content.summary) ||
    (typeof content.body === 'string' && content.body) ||
    post?.summary ||
    ''
  const clean = raw.replace(/<[^>]*>/g, ' ').replace(/&[a-z]+;/gi, ' ').replace(/\s+/g, ' ').trim()
  return clean.length > limit ? `${clean.slice(0, limit).trim()}...` : clean
}

export function getEditableCategory(post?: SitePost | null) {
  const content = post?.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
  return (typeof content.category === 'string' && content.category) || post?.tags?.[0] || 'Newswire'
}

export function postHref(task: TaskKey, post: SitePost, route = `/${task}`) {
  return `${route}/${post.slug}`
}

/** Text-forward dark feature card (no image — home cards stay image-free). */
export function EditorialFeatureCard({ post, href, label = 'Lead release' }: { post: SitePost; href: string; label?: string }) {
  return (
    <Link href={href} data-reveal className="signal-on-dark group relative block overflow-hidden rounded-3xl bg-[var(--slot4-dark-bg)] p-8 text-white sm:p-10">
      <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-[var(--slot4-accent)] opacity-30 blur-3xl transition group-hover:opacity-50" />
      <div className="pointer-events-none absolute -bottom-20 -left-10 h-56 w-56 rounded-full bg-[var(--slot4-accent-2)] opacity-20 blur-3xl" />
      <div className="relative">
        <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.18em] text-white/80">
          <Newspaper className="h-3.5 w-3.5" /> {label}
        </span>
        <h3 className="beacon-display mt-6 max-w-2xl text-3xl font-extrabold leading-[1.06] tracking-[-0.03em] sm:text-4xl">{post.title}</h3>
        <p className="mt-5 max-w-xl text-sm leading-7 text-white/70 sm:text-base">{getEditableExcerpt(post, 180)}</p>
        <span className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-white">
          Read the release <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>
    </Link>
  )
}

/** Image-free release card used on the home rails/grids. */
export function RailPostCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  return (
    <Link href={href} data-reveal style={{ '--reveal-delay': `${(index % 4) * 80}ms` } as CSSProperties} className={`group ${dc.layout.minRailCard} block rounded-3xl border ${pal.border} ${pal.surfaceBg} p-6 ${pal.shadow} ${dc.motion.lift}`}>
      <div className="flex items-center justify-between gap-3">
        <span className="inline-flex items-center rounded-full bg-[var(--slot4-accent-soft)] px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.14em] text-[var(--slot4-accent-strong)]">{getEditableCategory(post)}</span>
        <span className="text-xs font-extrabold text-[var(--slot4-soft-muted-text)]">{String(index + 1).padStart(2, '0')}</span>
      </div>
      <h3 className="beacon-display mt-5 line-clamp-3 text-xl font-extrabold leading-snug tracking-[-0.02em] transition group-hover:text-[var(--slot4-accent)]">{post.title}</h3>
      <p className={`mt-3 line-clamp-3 text-sm leading-7 ${pal.mutedText}`}>{getEditableExcerpt(post, 130)}</p>
      <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[var(--slot4-accent)]">
        Read release <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </span>
    </Link>
  )
}

/** Compact numbered list item (text-only). */
export function CompactIndexCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  return (
    <Link href={href} data-reveal className="group grid min-w-0 grid-cols-[44px_1fr] gap-4 rounded-2xl px-2 py-4 transition hover:bg-[var(--slot4-accent-soft)]/60">
      <span className="text-2xl font-extrabold leading-none text-[var(--slot4-accent)]">{String(index + 1).padStart(2, '0')}</span>
      <div className="min-w-0">
        <p className="flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-[0.14em] text-[var(--slot4-soft-muted-text)]"><Clock3 className="h-3 w-3" /> {getEditableCategory(post)}</p>
        <h3 className="mt-1.5 line-clamp-2 text-base font-bold leading-snug tracking-[-0.01em] transition group-hover:text-[var(--slot4-accent)]">{post.title}</h3>
      </div>
    </Link>
  )
}

/** List-style card used on the (image-supporting) media archive/blog. */
export function ArticleListCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  return (
    <Link href={href} data-reveal className={`group grid min-w-0 gap-6 rounded-3xl border ${pal.border} ${pal.surfaceBg} p-5 ${pal.shadow} ${dc.motion.lift} sm:grid-cols-[260px_minmax(0,1fr)]`}>
      <div className="beacon-zoom relative aspect-[16/10] overflow-hidden rounded-2xl bg-[var(--slot4-media-bg)]">
        <img src={getEditablePostImage(post)} alt={post.title} className="absolute inset-0 h-full w-full object-cover" />
      </div>
      <div className="min-w-0 self-center">
        <p className={`${dc.type.eyebrow} ${pal.accentText}`}>{String(index + 1).padStart(2, '0')} · {getEditableCategory(post)}</p>
        <h2 className="beacon-display mt-3 line-clamp-2 text-2xl font-extrabold leading-snug tracking-[-0.02em] transition group-hover:text-[var(--slot4-accent)]">{post.title}</h2>
        <p className={`mt-3 line-clamp-2 text-sm leading-7 ${pal.mutedText}`}>{getEditableExcerpt(post, 180)}</p>
        <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[var(--slot4-accent)]">Read release <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></span>
      </div>
    </Link>
  )
}

/** Image-bearing blog/grid card for the archive (Swipix Resources style). */
export function BlogPostCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  return (
    <Link href={href} data-reveal style={{ '--reveal-delay': `${(index % 3) * 90}ms` } as CSSProperties} className={`group flex flex-col overflow-hidden rounded-3xl border ${pal.border} ${pal.surfaceBg} ${pal.shadow} ${dc.motion.lift}`}>
      <div className="beacon-zoom relative aspect-[16/10] overflow-hidden bg-[var(--slot4-media-bg)]">
        <img src={getEditablePostImage(post)} alt={post.title} className="absolute inset-0 h-full w-full object-cover" />
        <span className="absolute left-4 top-4 inline-flex items-center rounded-full bg-white/95 px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.12em] text-[var(--slot4-accent-strong)] shadow-sm">{getEditableCategory(post)}</span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="beacon-display text-xl font-extrabold leading-snug tracking-[-0.02em] transition group-hover:text-[var(--slot4-accent)]">{post.title}</h3>
        <p className={`mt-3 line-clamp-3 flex-1 text-sm leading-7 ${pal.mutedText}`}>{getEditableExcerpt(post, 150)}</p>
        <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[var(--slot4-accent)]">Read release <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></span>
      </div>
    </Link>
  )
}
