# generate-blog-post

Deno edge function that writes a Techbite-style article from **free** sources.

1. Collect recent technology/software-development stories from Google News RSS,
   general tech feeds, and Hacker News.
2. Rank them by relevance to the requested categories, then by recency.
3. Ask an LLM to synthesize a Techbite-style Markdown article with sources.
4. Insert the result into `public.blog_pages`.

No X/Twitter API subscription is needed.

## Categories

Pass one string, a comma-separated string, or an array of strings.

```bash
# one topic
curl -X POST ".../generate-blog-post?query=angular" ...

# comma-separated
curl -X POST ".../generate-blog-post?query=angular,java" ...

# repeated parameter
curl -X POST ".../generate-blog-post?query=angular&query=java" ...

# JSON body
curl -X POST ".../generate-blog-post" \
  -H "Content-Type: application/json" \
  -d '{"query": ["angular", "java"]}'

# raw JSON array
curl -X POST ".../generate-blog-post" \
  -H "Content-Type: application/json" \
  -d '["angular", "java"]'

# plain text
curl -X POST ".../generate-blog-post" \
  -H "Content-Type: text/plain" \
  -d 'angular, java'
```

Defaults to `software development` and `technology` when no query is passed.
Up to 5 categories are used.

## Sources

- Google News RSS — one combined query built from the categories
  (e.g. `("software development" OR angular) (programming OR developer OR ...)`)
- Dev.to tag feed — one per category (e.g. `/feed/tag/angular`)
- TechCrunch
- The Verge
- Ars Technica
- Hacker News (Algolia search API, one query per category)

Override the feeds with `NEWS_FEEDS` (comma-separated RSS/Atom URLs) and the
Hacker News query with `HN_QUERY`.

## Deploy

```bash
supabase functions deploy generate-blog-post --no-verify-jwt
```

## Secrets

Pick one LLM provider:

```bash
# OpenAI (paid)
supabase secrets set OPENAI_API_KEY=...

# Groq (OpenAI-compatible; use a non-Enterprise model)
supabase secrets set GROQ_API_KEY=... LLM_PROVIDER=groq LLM_MODEL=openai/gpt-oss-120b

# OpenRouter (free models available, e.g. "...:free")
supabase secrets set OPENROUTER_API_KEY=... LLM_PROVIDER=openrouter LLM_MODEL=meta-llama/llama-3.3-70b-instruct:free

# xAI
supabase secrets set XAI_API_KEY=... LLM_PROVIDER=xai
```

Recommended:

```bash
supabase secrets set \
  BLOG_WEBHOOK_SECRET=... \
  DEFAULT_BLOG_IMAGE=assets/img/coding.jpeg
```

The Supabase runtime provides `SUPABASE_URL` and
`SUPABASE_SERVICE_ROLE_KEY` automatically.

## Optional variables

| Variable | Default | Purpose |
| --- | --- | --- |
| `LLM_PROVIDER` | auto-detect | `openai`, `groq`, `openrouter`, `xai` |
| `LLM_MODEL` | provider default | Model name |
| `LLM_MAX_TOKENS` | `4096` | Max output tokens |
| `NEWS_FEEDS` | built-in feeds | Comma-separated RSS/Atom URLs |
| `HN_QUERY` | category names | Hacker News search query |
| `DEFAULT_BLOG_IMAGE` | `assets/img/coding.jpeg` | Fallback hero image |

## Invoke

```bash
curl -X POST "https://<project-ref>.supabase.co/functions/v1/generate-blog-post?query=angular,java" \
  -H "x-webhook-secret: $BLOG_WEBHOOK_SECRET" \
  -H "Content-Type: application/json"
```

Dry run (returns categories, the source list, and the generated post without
inserting):

```bash
curl -X POST "https://<project-ref>.supabase.co/functions/v1/generate-blog-post?query=rust&dryRun=1" \
  -H "x-webhook-secret: $BLOG_WEBHOOK_SECRET"
```

## Notes

- Feed failures are non-fatal: the function keeps whatever sources respond.
- Stories are ranked by category relevance first, then recency/HN points.
- Source links are compacted: the visible label is `Publisher — Title`, while
  the full URL stays as the Markdown link target. Bare URLs in prose are also
  converted to compact links.
- The hero image is taken from the first RSS item that exposes one, then
  `DEFAULT_BLOG_IMAGE`.
- The function writes with the service-role key; public reads remain protected
  by the `Public read access` RLS policy.
- Always set `BLOG_WEBHOOK_SECRET` when deploying with `--no-verify-jwt`.
