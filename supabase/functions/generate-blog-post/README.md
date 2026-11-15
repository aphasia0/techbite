# generate-blog-post

Deno edge function that writes a Techbite-style article from **free** sources:

1. Collect recent AI-in-the-US stories from RSS feeds + Hacker News.
2. Rank, dedupe, and keep a diverse set of up to 12 stories.
3. Ask an LLM to synthesize a Techbite-style Markdown article with sources.
4. Insert the result into `public.blog_pages`.

No X/Twitter API subscription is needed.

## Sources

Default feeds:

- Google News RSS — `artificial intelligence United States`
- TechCrunch AI
- The Verge AI
- Wired AI
- MIT Technology Review AI
- Hacker News (Algolia search API)

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
| `HN_QUERY` | `artificial intelligence` | Hacker News search query |
| `DEFAULT_BLOG_IMAGE` | `assets/img/coding.jpeg` | Fallback hero image |

## Invoke

```bash
curl -X POST "https://<project-ref>.supabase.co/functions/v1/generate-blog-post" \
  -H "x-webhook-secret: $BLOG_WEBHOOK_SECRET" \
  -H "Content-Type: application/json"
```

Dry run (returns the generated post and the source list without inserting):

```bash
curl -X POST "https://<project-ref>.supabase.co/functions/v1/generate-blog-post?dryRun=1" \
  -H "x-webhook-secret: $BLOG_WEBHOOK_SECRET"
```

## Notes

- Feed failures are non-fatal: the function uses `Promise.allSettled` and keeps
  whatever sources respond.
- The hero image is taken from the first RSS item that exposes one, then
  `DEFAULT_BLOG_IMAGE`.
- The function writes with the service-role key; public reads remain protected
  by the `Public read access` RLS policy.
- Always set `BLOG_WEBHOOK_SECRET` when deploying with `--no-verify-jwt`.
