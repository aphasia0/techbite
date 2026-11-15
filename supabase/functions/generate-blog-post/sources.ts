const USER_AGENT = 'TechbiteBot/1.0 (+https://antoniogiordano.dev)';

export interface Feed {
  name: string;
  url: string;
}

export interface Story {
  title: string;
  summary: string;
  url: string;
  source: string;
  publishedAt?: string;
  imageUrl?: string;
  score: number;
}

export const DEFAULT_FEEDS: Feed[] = [
  {
    name: 'Google News · AI US',
    url:
      'https://news.google.com/rss/search?q=artificial+intelligence+United+States&hl=en-US&gl=US&ceid=US:en',
  },
  {
    name: 'TechCrunch AI',
    url: 'https://techcrunch.com/category/artificial-intelligence/feed/',
  },
  {
    name: 'The Verge AI',
    url: 'https://www.theverge.com/rss/ai-artificial-intelligence/index.xml',
  },
  {
    name: 'Wired AI',
    url: 'https://www.wired.com/feed/tag/ai/latest/rss',
  },
  {
    name: 'MIT Technology Review AI',
    url: 'https://www.technologyreview.com/topic/artificial-intelligence/feed',
  },
];

export async function collectStories(): Promise<Story[]> {
  const customFeeds = (Deno.env.get('NEWS_FEEDS') ?? '')
    .split(',')
    .map((value) => value.trim())
    .filter(Boolean)
    .map((feedUrl) => ({ name: hostname(feedUrl), url: feedUrl }));

  const feeds = customFeeds.length > 0 ? customFeeds : DEFAULT_FEEDS;
  const hnQuery = Deno.env.get('HN_QUERY') ?? 'artificial intelligence';

  const [feedResults, hnStories] = await Promise.all([
    Promise.allSettled(feeds.map((feed) => fetchFeed(feed))),
    fetchHackerNews(hnQuery).catch((error) => {
      console.warn('Hacker News fetch failed', error);
      return [] as Story[];
    }),
  ]);

  const stories: Story[] = [];
  for (const result of feedResults) {
    if (result.status === 'fulfilled') {
      stories.push(...result.value);
    } else {
      console.warn('Feed failed', result.reason);
    }
  }
  stories.push(...hnStories);

  return rankStories(stories);
}

async function fetchFeed(feed: Feed): Promise<Story[]> {
  const response = await fetch(feed.url, {
    headers: {
      'User-Agent': USER_AGENT,
      Accept:
        'application/rss+xml, application/atom+xml, application/xml, text/xml, */*',
    },
    signal: AbortSignal.timeout(8000),
  });

  if (!response.ok) {
    throw new Error(`${feed.name} returned ${response.status}`);
  }

  return parseFeed(await response.text(), feed).slice(0, 10);
}

async function fetchHackerNews(query: string): Promise<Story[]> {
  const since = Math.floor(Date.now() / 1000) - 7 * 24 * 60 * 60;
  const params = new URLSearchParams({
    query,
    tags: 'story',
    hitsPerPage: '20',
    numericFilters: `created_at_i>${since}`,
  });

  const response = await fetch(
    `https://hn.algolia.com/api/v1/search_by_date?${params}`,
    {
      headers: { 'User-Agent': USER_AGENT },
      signal: AbortSignal.timeout(8000),
    },
  );

  if (!response.ok) {
    throw new Error(`Hacker News returned ${response.status}`);
  }

  const body = (await response.json()) as {
    hits?: {
      objectID: string;
      title?: string;
      url?: string;
      created_at?: string;
      points?: number;
      num_comments?: number;
    }[];
  };

  return (body.hits ?? [])
    .filter((hit) => hit.title && hit.url)
    .map((hit) => ({
      title: hit.title!,
      summary: `Hacker News discussion with ${hit.points ?? 0} points and ${
        hit.num_comments ?? 0
      } comments.`,
      url: hit.url!,
      source: 'Hacker News',
      publishedAt: toIsoDate(hit.created_at),
      score: (hit.points ?? 0) / 100,
    }));
}

export function parseFeed(xml: string, feed: Feed): Story[] {
  const items = [...xml.matchAll(/<(item|entry)\b[\s\S]*?<\/\1>/gi)].map((
    match,
  ) => match[0]);

  return items
    .map((item) => toStory(item, feed))
    .filter((story): story is Story => story !== null);
}

function toStory(item: string, feed: Feed): Story | null {
  const title = extractTag(item, 'title');
  const link = extractLink(item);
  if (!title || !link) {
    return null;
  }

  const rawSummary = extractTag(item, 'description') ??
    extractTag(item, 'summary') ??
    extractTag(item, 'content:encoded') ??
    extractTag(item, 'content') ??
    '';

  const publisher = extractTag(item, 'source');
  const publishedAt = extractTag(item, 'pubDate') ??
    extractTag(item, 'published') ??
    extractTag(item, 'updated');

  return {
    title: stripHtml(title),
    summary: stripHtml(rawSummary).slice(0, 600),
    url: decodeEntities(link).trim(),
    source: publisher ? stripHtml(publisher) : feed.name,
    publishedAt: toIsoDate(publishedAt),
    imageUrl: extractImage(item),
    score: 0,
  };
}

export function rankStories(stories: Story[]): Story[] {
  const seen = new Set<string>();
  const now = Date.now();

  const unique = stories.filter((story) => {
    const key = story.title.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
    if (!key || seen.has(key)) {
      return false;
    }
    seen.add(key);
    return true;
  });

  const scored = unique.map((story) => {
    const ageDays = story.publishedAt
      ? Math.max(0, (now - new Date(story.publishedAt).getTime()) / 86_400_000)
      : 7;
    const recency = Math.max(0, 14 - ageDays);
    return { ...story, score: story.score + recency };
  });

  scored.sort((a, b) => b.score - a.score);

  const perSource = new Map<string, number>();
  const selected: Story[] = [];

  for (const story of scored) {
    const count = perSource.get(story.source) ?? 0;
    if (count >= 4) {
      continue;
    }
    perSource.set(story.source, count + 1);
    selected.push(story);
    if (selected.length >= 12) {
      break;
    }
  }

  return selected;
}

function extractTag(xml: string, tag: string): string | undefined {
  const escaped = tag.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const match = xml.match(
    new RegExp(`<${escaped}(?:\\s[^>]*)?>([\\s\\S]*?)</${escaped}>`, 'i'),
  );
  return match ? unwrapCdata(match[1]).trim() : undefined;
}

function extractLink(item: string): string | undefined {
  const atom = item.match(/<link\b[^>]*\bhref=["']([^"']+)["'][^>]*\/?>/i);
  if (atom) {
    return atom[1];
  }
  return extractTag(item, 'link');
}

function extractImage(item: string): string | undefined {
  const media = item.match(/<media:content\b[^>]*\burl=["']([^"']+)["']/i);
  if (media) {
    return decodeEntities(media[1]);
  }

  const enclosure = item.match(
    /<enclosure\b[^>]*\burl=["']([^"']+)["'][^>]*\btype=["']image\//i,
  ) ??
    item.match(
      /<enclosure\b[^>]*\btype=["']image\/[^"']*["'][^>]*\burl=["']([^"']+)["']/i,
    );
  if (enclosure) {
    return decodeEntities(enclosure[1]);
  }

  const img = item.match(/<img\b[^>]*\bsrc=["']([^"']+)["']/i);
  return img ? decodeEntities(img[1]) : undefined;
}

function unwrapCdata(value: string): string {
  return value.replace(/^<!\[CDATA\[/, '').replace(/\]\]>$/, '');
}

function stripHtml(value: string): string {
  return decodeEntities(
    value.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim(),
  );
}

function decodeEntities(value: string): string {
  const named: Record<string, string> = {
    amp: '&',
    lt: '<',
    gt: '>',
    quot: '"',
    apos: "'",
    nbsp: ' ',
    mdash: '—',
    ndash: '–',
    hellip: '…',
    lsquo: '‘',
    rsquo: '’',
    ldquo: '“',
    rdquo: '”',
    copy: '©',
    reg: '®',
    trade: '™',
  };

  return value
    .replace(
      /&#x([0-9a-f]+);/gi,
      (match, hex) => codePoint(parseInt(hex, 16), match),
    )
    .replace(/&#(\d+);/g, (match, dec) => codePoint(parseInt(dec, 10), match))
    .replace(
      /&([a-z]+);/gi,
      (match, name) => named[name.toLowerCase()] ?? match,
    );
}

function codePoint(code: number, fallback: string): string {
  if (!Number.isFinite(code) || code < 0 || code > 0x10ffff) {
    return fallback;
  }
  try {
    return String.fromCodePoint(code);
  } catch {
    return fallback;
  }
}

function toIsoDate(value?: string): string | undefined {
  if (!value) {
    return undefined;
  }
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? undefined : date.toISOString();
}

function hostname(value: string): string {
  try {
    return new URL(value).hostname;
  } catch {
    return 'Custom feed';
  }
}
