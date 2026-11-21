/// <reference lib="deno.ns" />
/**
 * generate-blog-post
 *
 * Free pipeline for the Techbite blog:
 *   1. collect recent technology/development stories from Google News RSS,
 *      general tech feeds and Hacker News (see ./sources.ts)
 *   2. rank them by relevance to the requested categories
 *   3. ask an LLM to synthesize a Techbite-style Markdown article
 *   4. insert the article into public.blog_pages
 *
 * Categories can be passed as:
 *   ?query=angular
 *   ?query=angular,java
 *   ?query=angular&query=java
 *   JSON body: { "query": ["angular", "java"] }
 *   JSON array body: ["angular", "java"]
 *   plain text body: angular, java
 *
 * Deploy:
 *   supabase functions deploy generate-blog-post --no-verify-jwt
 *
 * Required secret (pick one provider):
 *   OPENAI_API_KEY | GROQ_API_KEY | OPENROUTER_API_KEY | XAI_API_KEY
 *
 * Recommended secrets:
 *   BLOG_WEBHOOK_SECRET     shared secret checked via x-webhook-secret
 *   DEFAULT_BLOG_IMAGE      fallback hero image (default: assets/img/coding.jpeg)
 *
 * Optional:
 *   LLM_PROVIDER            openai | groq | openrouter | xai
 *   LLM_MODEL               provider-specific model name
 *   LLM_MAX_TOKENS          max output tokens (default: 4096)
 *   NEWS_FEEDS              comma-separated RSS/Atom feed URLs
 *   HN_QUERY                Hacker News search query (overrides categories)
 */
import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { collectStories, normalizeCategories, type Story } from './sources.ts';
import { buildSourceLabels, compactLinks } from './markdown.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type, x-webhook-secret',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

const SYSTEM_PROMPT =
  `You are the editor of Techbite, a developer blog written by Antonio Giordano.

You receive recent news stories and community posts about technology and software development. Turn them into ONE cohesive blog post in Markdown.

The user will give you the topics to focus on. Keep the article practical, opinionated, and developer-oriented, even when a story is broader tech news.

Style and structure:
- Start with "## <title>" (the post title repeated as the first heading).
- Open with one short intro paragraph (2-4 sentences).
- Use 3 to 5 "###" sections separated by "---".
- Use "> " blockquotes for notable quotes, attributing the source when available.
- Finish with "### Sources" and a bullet list of compact Markdown links: "- [Publisher — Title](URL)". Never paste a raw URL as visible text.
- 600-900 words. Practical, opinionated, developer-focused, first person ("I").
- Only state facts that appear in the provided stories. Do not invent numbers, quotes, products, or events.
- If the stories do not support a coherent article, return {"error":"..."} instead of inventing content.

Return JSON only, with this exact shape:
{
  "id": "kebab-case-slug",
  "title": "Short, specific title",
  "subtitle": "One-line subtitle",
  "content": "## Title\\n\\nMarkdown body..."
}`;

type ProviderName = 'openai' | 'groq' | 'openrouter' | 'xai';

interface ProviderConfig {
  baseUrl: string;
  keyEnv: string;
  defaultModel: string;
  jsonMode: boolean;
  maxTokensParam: 'max_tokens' | 'max_completion_tokens';
}

const PROVIDERS: Record<ProviderName, ProviderConfig> = {
  openai: {
    baseUrl: 'https://api.openai.com/v1',
    keyEnv: 'OPENAI_API_KEY',
    defaultModel: 'gpt-4o-mini',
    jsonMode: true,
    maxTokensParam: 'max_completion_tokens',
  },
  groq: {
    baseUrl: 'https://api.groq.com/openai/v1',
    keyEnv: 'GROQ_API_KEY',
    defaultModel: 'openai/gpt-oss-120b',
    jsonMode: true,
    maxTokensParam: 'max_completion_tokens',
  },
  openrouter: {
    baseUrl: 'https://openrouter.ai/api/v1',
    keyEnv: 'OPENROUTER_API_KEY',
    defaultModel: 'meta-llama/llama-3.3-70b-instruct:free',
    jsonMode: true,
    maxTokensParam: 'max_tokens',
  },
  xai: {
    baseUrl: 'https://api.x.ai/v1',
    keyEnv: 'XAI_API_KEY',
    defaultModel: 'grok-3',
    jsonMode: false,
    maxTokensParam: 'max_tokens',
  },
};

interface GeneratedPost {
  id?: string;
  title: string;
  subtitle: string;
  content: string;
}

interface RequestOptions {
  categories: string[];
  dryRun: boolean;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  if (req.method !== 'POST') {
    return json({ error: 'Use POST' }, 405);
  }

  const expectedSecret = Deno.env.get('BLOG_WEBHOOK_SECRET');
  if (
    expectedSecret && req.headers.get('x-webhook-secret') !== expectedSecret
  ) {
    return json({ error: 'Unauthorized' }, 401);
  }

  try {
    const { categories, dryRun } = await readRequestOptions(req);

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
      { auth: { persistSession: false } },
    );

    const stories = await collectStories(categories);
    if (stories.length === 0) {
      return json({ error: 'No recent stories found', categories }, 404);
    }

    const generated = await generatePost(stories, categories);
    const slug = await uniqueSlug(
      supabase,
      slugify(generated.id || generated.title),
    );

    const payload = {
      id: slug,
      title: generated.title,
      subtitle: generated.subtitle,
      content: generated.content,
      image_url: pickImage(stories) ??
        Deno.env.get('DEFAULT_BLOG_IMAGE') ??
        'assets/img/coding.jpeg',
      image_style: 'cover' as const,
      published_at: new Date().toISOString().slice(0, 10),
    };

    if (dryRun) {
      return json({
        dryRun: true,
        categories,
        stories: stories.map((story) => ({
          source: story.source,
          title: story.title,
          url: story.url,
        })),
        post: payload,
      });
    }

    const { data, error } = await supabase
      .from('blog_pages')
      .insert(payload)
      .select('id, title, subtitle, published_at')
      .single();

    if (error) {
      // Unique violation: another request may have created the same slug.
      if (error.code === '23505') {
        const retryId = `${slug}-${Date.now().toString(36)}`;
        const retry = await supabase
          .from('blog_pages')
          .insert({ ...payload, id: retryId })
          .select('id, title, subtitle, published_at')
          .single();
        if (retry.error) throw retry.error;
        return json({
          created: retry.data,
          categories,
          stories: stories.length,
        }, 201);
      }
      throw error;
    }

    return json({ created: data, categories, stories: stories.length }, 201);
  } catch (error) {
    console.error('generate-blog-post failed', error);
    return json({
      error: error instanceof Error ? error.message : String(error),
    }, 500);
  }
});

async function readRequestOptions(req: Request): Promise<RequestOptions> {
  const url = new URL(req.url);
  const dryRun = url.searchParams.get('dryRun') === '1';

  const fromQuery = [
    ...url.searchParams.getAll('query'),
    ...url.searchParams.getAll('q'),
    ...url.searchParams.getAll('categories'),
  ];

  let fromBody: unknown;
  const contentType = req.headers.get('content-type') ?? '';

  if (contentType.includes('application/json')) {
    try {
      const body = await req.json();
      if (Array.isArray(body) || typeof body === 'string') {
        fromBody = body;
      } else if (body && typeof body === 'object') {
        const record = body as Record<string, unknown>;
        fromBody = record['query'] ?? record['categories'] ?? record['topics'];
      }
    } catch {
      // Ignore invalid JSON.
    }
  } else if (contentType.includes('text/plain')) {
    fromBody = await req.text();
  }

  const merged = [
    ...(Array.isArray(fromBody) ? fromBody : fromBody ? [fromBody] : []),
    ...fromQuery,
  ];

  return {
    categories: normalizeCategories(merged),
    dryRun,
  };
}

async function generatePost(
  stories: Story[],
  categories: string[],
): Promise<GeneratedPost> {
  const providerName = pickProvider();
  const provider = PROVIDERS[providerName];
  const apiKey = Deno.env.get(provider.keyEnv);
  if (!apiKey) {
    throw new Error(`Missing ${provider.keyEnv} secret`);
  }

  const model = Deno.env.get('LLM_MODEL') ?? provider.defaultModel;
  const storyBlock = stories
    .map((story) => {
      const date = story.publishedAt
        ? story.publishedAt.slice(0, 10)
        : 'recent';
      return `---\n[${story.source}] ${story.title} (${date})\n${story.summary}\nURL: ${story.url}`;
    })
    .join('\n');

  const userPrompt = `Requested topics: ${
    categories.join(', ')
  }\n\nRecent technology stories:\n\n${storyBlock}\n\nWrite the post now. Return JSON only.`;

  const headers: Record<string, string> = {
    Authorization: `Bearer ${apiKey}`,
    'Content-Type': 'application/json',
  };

  if (providerName === 'openrouter') {
    headers['HTTP-Referer'] = 'https://antoniogiordano.dev';
    headers['X-Title'] = 'Techbite';
  }

  const requestBody: Record<string, unknown> = {
    model,
    temperature: 0.6,
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      { role: 'user', content: userPrompt },
    ],
  };

  requestBody[provider.maxTokensParam] = maxTokens();

  if (provider.jsonMode) {
    requestBody['response_format'] = { type: 'json_object' };
  }

  const response = await fetch(`${provider.baseUrl}/chat/completions`, {
    method: 'POST',
    headers,
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    const body = (await response.text()).slice(0, 500);
    if (response.status === 404) {
      throw new Error(
        `LLM API 404 for model "${model}". Set LLM_MODEL to a model available to your provider. ${body}`,
      );
    }
    throw new Error(`LLM API ${response.status}: ${body}`);
  }

  const result = (await response.json()) as {
    choices?: { message?: { content?: string } }[];
  };
  const content = result.choices?.[0]?.message?.content;
  if (typeof content !== 'string') {
    throw new Error('LLM returned no content');
  }

  const parsed = parseJson(content);
  if (parsed.error) {
    throw new Error(parsed.error);
  }

  const title = parsed.title?.trim();
  const subtitle = parsed.subtitle?.trim();
  const generatedContent = parsed.content?.trim();
  if (!title || !subtitle || !generatedContent) {
    throw new Error('LLM response is missing title, subtitle or content');
  }

  const labels = buildSourceLabels(stories);
  const compactedContent = compactLinks(generatedContent, labels);

  return {
    id: parsed.id,
    title,
    subtitle,
    content: compactedContent.startsWith('## ')
      ? compactedContent
      : `## ${title}\n\n${compactedContent}`,
  };
}

function maxTokens(): number {
  const configured = Number(Deno.env.get('LLM_MAX_TOKENS') ?? '4096');
  return Number.isFinite(configured) && configured > 0 ? configured : 4096;
}

function pickProvider(): ProviderName {
  const configured = Deno.env.get('LLM_PROVIDER')?.toLowerCase();
  if (configured && configured in PROVIDERS) {
    return configured as ProviderName;
  }

  if (Deno.env.get('OPENAI_API_KEY')) return 'openai';
  if (Deno.env.get('GROQ_API_KEY')) return 'groq';
  if (Deno.env.get('OPENROUTER_API_KEY')) return 'openrouter';
  if (Deno.env.get('XAI_API_KEY')) return 'xai';
  return 'openai';
}

function parseJson(value: string): Partial<GeneratedPost> & { error?: string } {
  const candidates = [value];
  const start = value.indexOf('{');
  const end = value.lastIndexOf('}');
  if (start >= 0 && end > start) {
    candidates.push(value.slice(start, end + 1));
  }

  for (const candidate of candidates) {
    try {
      return JSON.parse(candidate) as Partial<GeneratedPost> & {
        error?: string;
      };
    } catch {
      // Try the next candidate.
    }
  }

  throw new Error('Could not parse the LLM JSON response');
}

async function uniqueSlug(
  supabase: SupabaseClient,
  base: string,
): Promise<string> {
  let candidate = base;

  for (let attempt = 2; attempt <= 50; attempt++) {
    const { data, error } = await supabase
      .from('blog_pages')
      .select('id')
      .eq('id', candidate)
      .maybeSingle();

    if (error) {
      throw error;
    }
    if (!data) {
      return candidate;
    }
    candidate = `${base}-${attempt}`;
  }

  return `${base}-${Date.now().toString(36)}`;
}

function slugify(value: string): string {
  const slug = value
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/-{2,}/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80)
    .replace(/-+$/g, '');

  return slug || `techbite-${new Date().toISOString().slice(0, 10)}`;
}

function pickImage(stories: Story[]): string | undefined {
  return stories.find((story) => story.imageUrl)?.imageUrl;
}

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}
