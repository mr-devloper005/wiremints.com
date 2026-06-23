import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Filter, Search } from 'lucide-react'
import { buildPageMetadata } from '@/lib/seo'
import { fetchSiteFeed } from '@/lib/site-connector'
import { buildPostUrl, getPostTaskKey } from '@/lib/task-data'
import { getMockPostsForTask } from '@/lib/mock-posts'
import { SITE_CONFIG, type TaskKey } from '@/lib/site-config'
import type { SitePost } from '@/lib/site-connector'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { pagesContent } from '@/editable/content/pages.content'

export const revalidate = 3

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    path: '/search',
    title: pagesContent.search.metadata.title,
    description: pagesContent.search.metadata.description,
  })
}

const stripHtml = (value: string) => value.replace(/<[^>]*>/g, ' ')
const compactText = (value: unknown) => typeof value === 'string' ? stripHtml(value).replace(/\s+/g, ' ').trim().toLowerCase() : ''
const getContent = (post: SitePost) => post.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
const getImage = (post: SitePost) => {
  const content = getContent(post)
  const media = Array.isArray(post.media) ? post.media.find((item) => typeof item?.url === 'string')?.url : ''
  const images = Array.isArray(content.images) ? content.images.find((item) => typeof item === 'string') as string | undefined : ''
  return media || compactRaw(content.featuredImage) || compactRaw(content.image) || compactRaw(content.thumbnail) || images || ''
}
const compactRaw = (value: unknown) => typeof value === 'string' ? value.trim() : ''
const summaryOf = (post: SitePost) => post.summary || compactRaw(getContent(post).description) || compactRaw(getContent(post).excerpt) || ''

const matches = (post: SitePost, query: string, category: string, task: string) => {
  const content = getContent(post)
  const typeText = compactText(content.type)
  if (typeText === 'comment') return false
  const derivedTask = getPostTaskKey(post) || typeText
  if (task && derivedTask !== task) return false
  const categoryText = compactText(content.category)
  const tagsText = compactText(Array.isArray(post.tags) ? post.tags.join(' ') : '')
  if (category && !(categoryText || tagsText).includes(category)) return false
  if (!query) return true
  return [post.title, post.summary, content.description, content.body, content.excerpt, content.category, Array.isArray(post.tags) ? post.tags.join(' ') : '']
    .some((value) => compactText(value).includes(query))
}

function SearchResultCard({ post }: { post: SitePost; index: number }) {
  const task = getPostTaskKey(post) as TaskKey | null
  const href = task ? buildPostUrl(task, post.slug) : `/article/${post.slug}`
  const image = getImage(post)
  const summary = summaryOf(post)
  const taskLabel = SITE_CONFIG.tasks.find((item) => item.key === task)?.label || 'Release'

  return (
    <Link href={href} data-reveal className="group flex flex-col overflow-hidden rounded-3xl border border-[var(--editable-border)] bg-white shadow-[0_14px_40px_rgba(26,20,34,0.07)] transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_28px_60px_rgba(26,20,34,0.16)]">
      {image ? (
        <div className="beacon-zoom relative aspect-[16/10] overflow-hidden bg-[var(--slot4-media-bg)]">
          <img src={image} alt="" className="h-full w-full object-cover" />
          <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.12em] text-[var(--slot4-accent-strong)] shadow-sm">{taskLabel}</span>
        </div>
      ) : null}
      <div className="flex flex-1 flex-col p-6">
        {!image ? <span className="inline-flex w-fit rounded-full bg-[var(--slot4-accent-soft)] px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.12em] text-[var(--slot4-accent-strong)]">{taskLabel}</span> : null}
        <h2 className="beacon-display mt-3 line-clamp-2 text-xl font-extrabold leading-snug tracking-[-0.02em] transition group-hover:text-[var(--slot4-accent)]">{post.title}</h2>
        {summary ? <p className="mt-3 line-clamp-3 flex-1 text-sm leading-7 text-[var(--slot4-muted-text)]">{summary}</p> : null}
        <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[var(--slot4-accent)]">Open result <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" /></span>
      </div>
    </Link>
  )
}

export default async function SearchPage({ searchParams }: { searchParams?: Promise<{ q?: string; category?: string; task?: string; master?: string }> }) {
  const resolved = (await searchParams) || {}
  const query = (resolved.q || '').trim()
  const normalized = query.toLowerCase()
  const category = (resolved.category || '').trim().toLowerCase()
  const task = (resolved.task || '').trim().toLowerCase()
  const useMaster = resolved.master !== '0'
  const feed = await fetchSiteFeed(useMaster ? 1000 : 300, useMaster ? { fresh: true, category: category || undefined, task: task || undefined } : undefined)
  const posts = feed?.posts?.length ? feed.posts : useMaster ? [] : SITE_CONFIG.tasks.filter((item) => item.enabled).flatMap((item) => getMockPostsForTask(item.key))
  const results = posts.filter((post) => matches(post, normalized, category, task)).slice(0, normalized ? 80 : 36)
  const enabledTasks = SITE_CONFIG.tasks.filter((item) => item.enabled)

  return (
    <EditableSiteShell>
      <main className="min-h-screen bg-[var(--slot4-page-bg)] text-[var(--slot4-page-text)]">
        {/* hero + search */}
        <section className="relative overflow-hidden">
          <div className="pointer-events-none absolute -right-40 -top-40 h-[32rem] w-[32rem] rounded-full bg-[var(--slot4-accent)] opacity-[0.09] blur-[130px]" />
          <div className="relative mx-auto w-full max-w-[var(--editable-container)] px-4 pb-6 pt-16 text-center sm:px-6 lg:px-8 sm:pt-20" data-reveal>
            <p className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-[var(--slot4-accent)]">{pagesContent.search.hero.badge}</p>
            <h1 className="beacon-display mx-auto mt-4 max-w-4xl text-[2.7rem] font-extrabold leading-[0.98] tracking-[-0.045em] sm:text-6xl">{pagesContent.search.hero.title}</h1>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-[var(--slot4-muted-text)] sm:text-lg">{pagesContent.search.hero.description}</p>

            <form action="/search" className="mx-auto mt-8 max-w-2xl">
              <input type="hidden" name="master" value="1" />
              <label className="flex items-center gap-2 rounded-full border border-[var(--editable-border)] bg-white p-1.5 shadow-[0_14px_40px_rgba(26,20,34,0.07)]">
                <Search className="ml-3 h-5 w-5 text-[var(--slot4-soft-muted-text)]" />
                <input name="q" defaultValue={query} placeholder={pagesContent.search.hero.placeholder} className="min-w-0 flex-1 bg-transparent px-2 py-2.5 text-sm outline-none placeholder:text-[var(--slot4-soft-muted-text)]" />
                <button className="rounded-full bg-[var(--slot4-accent)] px-6 py-2.5 text-sm font-bold text-white transition hover:bg-[var(--slot4-accent-strong)]" type="submit">Search</button>
              </label>
              <div className="mx-auto mt-3 grid max-w-xl gap-3 sm:grid-cols-2">
                <label className="flex items-center gap-2 rounded-full border border-[var(--editable-border)] bg-white px-4 py-2.5">
                  <Filter className="h-4 w-4 text-[var(--slot4-soft-muted-text)]" />
                  <input name="category" defaultValue={category} placeholder="Filter by channel" className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-[var(--slot4-soft-muted-text)]" />
                </label>
                <select name="task" defaultValue={task} className="rounded-full border border-[var(--editable-border)] bg-white px-4 py-2.5 text-sm font-semibold outline-none">
                  <option value="">All content types</option>
                  {enabledTasks.map((item) => <option key={item.key} value={item.key}>{item.label}</option>)}
                </select>
              </div>
            </form>
          </div>
        </section>

        {/* results */}
        <section className="mx-auto w-full max-w-[var(--editable-container)] px-4 pb-20 pt-6 sm:px-6 lg:px-8">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--slot4-soft-muted-text)]">{results.length} results</p>
              <h2 className="beacon-display mt-1 text-2xl font-extrabold tracking-[-0.02em]">{query ? `Results for “${query}”` : pagesContent.search.resultsTitle}</h2>
            </div>
            <Link href="/updates" className="inline-flex items-center gap-2 text-sm font-bold text-[var(--slot4-accent)] transition hover:gap-3">Browse latest <ArrowRight className="h-4 w-4" /></Link>
          </div>

          {results.length ? (
            <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
              {results.map((post, index) => <SearchResultCard key={post.id || post.slug} post={post} index={index} />)}
            </div>
          ) : (
            <div className="mx-auto max-w-xl rounded-3xl border border-dashed border-[var(--editable-border)] bg-white p-12 text-center">
              <Search className="mx-auto h-8 w-8 text-[var(--slot4-accent)]" />
              <p className="beacon-display mt-4 text-2xl font-extrabold tracking-[-0.02em]">No matching releases found</p>
              <p className="mt-2 text-sm text-[var(--slot4-muted-text)]">Try a different keyword, channel, or content type — or browse the latest releases.</p>
              <Link href="/updates" className="mt-6 inline-flex items-center gap-2 rounded-full border border-[var(--editable-border)] bg-white px-6 py-3 text-sm font-bold transition hover:border-[var(--slot4-accent)] hover:text-[var(--slot4-accent)]">Browse the newsroom <ArrowRight className="h-4 w-4" /></Link>
            </div>
          )}
        </section>
      </main>
    </EditableSiteShell>
  )
}
