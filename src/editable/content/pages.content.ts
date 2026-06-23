import { slot4BrandConfig } from '@/editable/theme/brand.config'

export const pagesContent = {
  home: {
    metadata: {
      title: 'Press release distribution & media coverage',
      description: 'Distribute press releases to journalists, newsrooms, and media outlets. Track verified coverage, amplify announcements, and measure reach from one modern newswire.',
      openGraphTitle: 'Press release distribution & media coverage',
      openGraphDescription: 'Put your announcements in front of the right journalists and outlets, then measure the coverage in real time.',
      keywords: ['press release distribution', 'media distribution', 'newswire', 'pr distribution', 'media coverage', 'news syndication'],
    },
    hero: {
      badge: 'Intelligence-led media distribution',
      title: ['Modern infrastructure for', 'press release distribution.'],
      description: 'Distribute announcements to a vetted network of journalists, newsrooms, and syndication partners — then track verified pickups and audience reach in real time, from one newswire.',
      primaryCta: { label: 'Distribute a release', href: '/create' },
      secondaryCta: { label: 'Browse the newsroom', href: '/updates' },
      searchPlaceholder: 'Search releases, companies, and coverage',
      focusLabel: 'Live newsroom',
      featureCardBadge: 'Verified coverage',
      featureCardTitle: 'Real pickups from real outlets, surfaced the moment they publish.',
      featureCardDescription: 'Every distributed release is tracked across the network so your team sees coverage as it lands.',
      stats: [
        { value: '12k+', label: 'Media outlets' },
        { value: '98%', label: 'Delivery rate' },
        { value: '160+', label: 'Countries reached' },
        { value: '4.2M', label: 'Monthly reach' },
      ],
    },
    trustedBy: {
      label: 'Trusted by 700+ communications teams & newsrooms',
      logos: ['Northwind', 'Vela Labs', 'BrightCircuit', 'Meridian PR', 'Halcyon', 'Outpost Media', 'Lumen'],
    },
    statement: {
      title: 'Wiremints helps over 500K announcements a year reach the desks that matter.',
      description: 'From product launches to earnings, our newswire routes every release to the right journalists and syndication partners — and proves the coverage.',
      cta: { label: 'Distribute a release', href: '/create' },
    },
    features: {
      badge: 'How it works',
      title: 'One newswire for the whole distribution lifecycle.',
      description: 'Write it once, send it everywhere, and watch the coverage build — without juggling a dozen tools.',
      items: [
        { icon: 'send', title: 'Distribute', description: 'Push your release to targeted journalists, newsrooms, and syndication partners in a single click.' },
        { icon: 'megaphone', title: 'Amplify', description: 'Boost reach across news media, business desks, and social channels with category-aware targeting.' },
        { icon: 'chart', title: 'Track', description: 'Measure verified pickups, audience reach, and engagement with a live coverage dashboard.' },
      ],
    },
    accentCard: {
      eyebrow: 'Smarter distribution',
      title: 'Smarter distribution starts here.',
      description: 'Create a release, choose your channels, and let the network carry it to the outlets and audiences that matter — with proof of coverage built in.',
      cta: { label: 'Get started free', href: '/signup' },
      points: ['Targeted journalist & newsroom delivery', 'Verified pickups and reach tracking', 'Category-led syndication network'],
    },
    categories: {
      badge: 'Distribution channels',
      title: 'Reach the desks that match your story.',
      items: [
        { icon: 'news', label: 'News Media', slug: 'news-media', blurb: 'Breaking and general news desks' },
        { icon: 'briefcase', label: 'Business', slug: 'business', blurb: 'Finance, markets & corporate' },
        { icon: 'megaphone', label: 'Press Releases', slug: 'press-release', blurb: 'Official company announcements' },
        { icon: 'cpu', label: 'Technology', slug: 'technology', blurb: 'Product, startup & innovation' },
        { icon: 'heart', label: 'Health', slug: 'health', blurb: 'Healthcare, wellness & biotech' },
        { icon: 'globe', label: 'World', slug: 'world', blurb: 'Regional & international outlets' },
      ],
    },
    testimonials: {
      badge: 'Trusted by communicators',
      title: 'Teams ship announcements with confidence.',
      items: [
        { quote: 'We went from chasing journalists to watching pickups roll in. Distribution that finally feels measurable.', name: 'Priya Menon', role: 'Head of Communications, Northwind' },
        { quote: 'The category targeting put our launch in front of the exact tech desks we wanted. Coverage doubled.', name: 'Daniel Roy', role: 'PR Lead, Vela Labs' },
        { quote: 'Clean dashboard, real numbers, no fluff. Our board finally sees the reach behind every release.', name: 'Amara Okafor', role: 'Founder, BrightCircuit' },
      ],
    },
    intro: {
      badge: 'Why a modern newswire',
      title: 'Built for reach, clarity, and proof of coverage.',
      paragraphs: [
        `${slot4BrandConfig.siteName} brings distribution, amplification, and measurement into one connected workflow so your announcements travel further with less friction.`,
        'Instead of scattering releases across disconnected inboxes and portals, every story is routed to the right desks, syndicated across partner outlets, and tracked back to verified pickups.',
        'Whether you are launching a product, sharing results, or responding to the moment, your team can move from draft to documented coverage without losing the thread.',
      ],
      sideBadge: 'At a glance',
      sidePoints: [
        'Targeted distribution to journalists and newsrooms by category.',
        'Syndication across a vetted network of media outlets.',
        'Live coverage tracking with verified pickups and reach.',
        'A reading-first newsroom that keeps every release on brand.',
      ],
      primaryLink: { label: 'Distribute a release', href: '/create' },
      secondaryLink: { label: 'See coverage', href: '/updates' },
    },
    cta: {
      badge: 'Start distributing',
      title: 'Ready to put your next announcement on the wire?',
      description: 'Create a release, choose your channels, and let the network carry it to the outlets and audiences that matter.',
      primaryCta: { label: 'Distribute a release', href: '/create' },
      secondaryCta: { label: 'Talk to our team', href: '/contact' },
    },
    taskSection: {
      heading: 'Latest {label}',
      descriptionSuffix: 'The newest releases moving across the wire.',
    },
  },
  archive: {
    badge: 'Newsroom',
    title: 'Media distribution trends & insights.',
    description: 'The latest releases, pickups, and announcements moving across the wire.',
    searchPlaceholder: 'Search releases and coverage',
    allLabel: 'All',
  },
  about: {
    badge: 'Our Story',
    title: 'A calmer, clearer way to explore content.',
    description: `${slot4BrandConfig.siteName} is built to make long-form reading, visual discovery, and supporting resources feel like one unified experience.`,
    paragraphs: [
      'Instead of splitting everything into disconnected pages, the platform keeps related content easy to move through and easy to understand.',
      'Whether someone starts with an article, listing, image post, or resource page, they can continue exploring without losing context.',
    ],
    values: [
      {
        title: 'Reading-first experience',
        description: 'We prioritize clarity, pacing, and structure so people can read, browse, and discover without noise.',
      },
      {
        title: 'Connected content surfaces',
        description: 'Articles, visual posts, listings, resources, and profiles stay connected so discovery feels natural across the site.',
      },
      {
        title: 'Simple and trustworthy',
        description: 'We focus on clean navigation and clear page structure to help visitors find useful content faster.',
      },
    ],
  },
  contact: {
    eyebrow: `Contact ${slot4BrandConfig.siteName}`,
    title: 'A support page that matches the product, not a generic contact form.',
    description: 'Tell us what you are trying to publish, fix, or launch. We will route it through the right lane instead of forcing every request into the same support bucket.',
    formTitle: 'Send a message',
  },

  search: {
    metadata: {
      title: 'Search',
      description: 'Search posts, topics, categories, and content across the site.',
    },
    hero: {
      badge: 'Search the archive',
      title: 'Find stories, listings, visuals, and resources faster.',
      description: 'Use keywords, categories, and content types to discover posts from every active section of the site.',
      placeholder: 'Search by keyword, topic, category, or title',
    },
    resultsTitle: 'Latest searchable content',
  },
  create: {
    metadata: {
      title: 'Create',
      description: 'Create and submit new content for the site.',
    },
    locked: {
      badge: 'Creator access',
      title: 'Login to create new content.',
      description: 'Use your account to open the publishing workspace and create posts for the active sections of this site.',
    },
    hero: {
      badge: 'Publishing workspace',
      title: 'Create content for every active section.',
      description: 'Choose the content type, add details, and prepare a clean post with images, links, summary, and body content.',
    },
    formTitle: 'Content details',
    submitLabel: 'Submit content',
    successTitle: 'Content submitted successfully.',
  },
  auth: {
    login: {
      metadataDescription: 'Login page for this site.',
      badge: 'Member access',
      title: 'Welcome back to your publishing space.',
      description: 'Login to continue browsing, managing submissions, and creating new content from your account.',
      formTitle: 'Login',
      submitLabel: 'Continue',
      noAccount: 'No account matched these details. Create an account first, then login.',
      success: 'Login successful. Redirecting...',
      createCta: 'Create an account',
    },
    signup: {
      metadataDescription: 'Signup page for this site.',
      badge: 'Site access',
      title: 'Create your account and start publishing.',
      description: 'Create an account to access the publishing workspace, save details, and submit content through the site.',
      formTitle: 'Create account',
      submitLabel: 'Create account',
      passwordShort: 'Use at least 4 characters for the password.',
      success: 'Account created successfully. Redirecting...',
      loginCta: 'Login',
    },
  },
  detailPages: {
    article: {
      relatedTitle: 'Related articles',
      fallbackTitle: 'Article details',
    },
    listing: {
      relatedTitle: 'Related listings',
      fallbackTitle: 'Listing details',
    },
    image: {
      relatedTitle: 'Related visuals',
      fallbackTitle: 'Image details',
    },
    profile: {
      relatedTitle: 'Suggested articles',
      fallbackDescription: 'Profile details will appear here once available.',
      visitButton: 'Visit Official Site',
    },
  },
} as const
