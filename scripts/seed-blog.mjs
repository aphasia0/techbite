#!/usr/bin/env node
/**
 * Seeds public.blog_pages from the local markdown files.
 *
 * Usage:
 *   SUPABASE_SERVICE_ROLE_KEY=sb_secret_... node scripts/seed-blog.mjs
 *
 * The URL is read from SUPABASE_URL, or from src/environments/environment.prod.ts.
 * Without a service-role key the script falls back to the publishable key, which
 * will normally be rejected by RLS (the table is read-only for anon).
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createClient } from '@supabase/supabase-js';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '..');
const mdDir = path.join(root, 'src/assets/md');
const envFile = path.join(root, 'src/environments/environment.prod.ts');

function readEnvironment() {
  const source = fs.readFileSync(envFile, 'utf8');
  return {
    url: source.match(/supabaseUrl:\s*'([^']+)'/)?.[1],
    anonKey: source.match(/supabaseAnonKey:\s*'([^']+)'/)?.[1],
  };
}

const env = readEnvironment();
const supabaseUrl = process.env.SUPABASE_URL ?? env.url;
const serviceKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.SUPABASE_SECRET_KEY;
const key = serviceKey ?? env.anonKey;

if (!supabaseUrl || !key) {
  console.error(
    'Missing Supabase URL/key. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.'
  );
  process.exit(1);
}

if (!serviceKey) {
  console.warn(
    'No SUPABASE_SERVICE_ROLE_KEY set; falling back to the publishable key. RLS may reject the upsert.'
  );
}

const posts = [
  {
    id: 'why-i-love-tailwind-css',
    title: 'Why I love tailwind css',
    subtitle: 'In one word: Laziness',
    file: 'why-i-love-tailwind-css.md',
    image: 'assets/img/tailwind.jpeg',
    style: 'cover',
    date: '2023-10-01',
  },
  {
    id: 'dart-tour-part-1',
    title: 'Dart Tour',
    subtitle: 'Part 1',
    file: 'dart-introduction.md',
    image: 'assets/img/dart.jpeg',
    style: 'cover',
    date: '2023-11-15',
  },
  {
    id: 'lombok-yes-i-like-it',
    title: 'Should you use Lombok project in modern Java?',
    subtitle: 'Short answer: yes',
    file: 'lombok.md',
    image: 'assets/img/lombok.webp',
    style: 'scale',
    date: '2023-12-20',
  },
  {
    id: 'java21-virtual-thread',
    title: 'Java 21 and Virtual Threads',
    subtitle: 'Why you should not miss this feature',
    file: 'java21-virtual-thread.md',
    image: 'assets/img/thread.jpeg',
    style: 'cover',
    date: '2024-01-10',
  },
  {
    id: 'ollama-local-llm',
    title: 'Run Local LLM with Ollama',
    subtitle: 'You need a big GPU to run this',
    file: 'ollama-local-llm.md',
    image: 'assets/img/ollama-local-llm.webp',
    style: 'cover',
    date: '2024-05-22',
  },
  {
    id: 'nano-banana-5-prompt',
    title: 'How powerful is nano banana?',
    subtitle: 'A lot, you need just the right recipe',
    file: 'nano-banana-5-prompt.md',
    image: 'assets/img/nano-banana-1.png',
    style: 'cover',
    date: '2025-01-05',
  },
  {
    id: 'n8n-integration-trick',
    title: 'Supercharge Workflows with n8n',
    subtitle: 'Master the Merge Node',
    file: 'n8n-integration-trick.md',
    image: 'assets/img/n8n-hero.webp',
    style: 'cover',
    date: '2026-02-07',
  },
  {
    id: 'ai-in-the-us',
    title: 'AI in the US: Bots, Ballots, and Business Agents',
    subtitle: 'What X/Twitter is saying about AI in America right now',
    file: 'ai-in-the-us.md',
    image: 'assets/img/ai-us-hero.svg',
    style: 'cover',
    date: '2026-11-14',
  },
];

const payload = posts.map((post) => ({
  id: post.id,
  title: post.title,
  subtitle: post.subtitle,
  content: fs.readFileSync(path.join(mdDir, post.file), 'utf8'),
  image_url: post.image,
  image_style: post.style,
  published_at: post.date,
}));

const supabase = createClient(supabaseUrl, key, {
  auth: { persistSession: false, autoRefreshToken: false },
});

const { data, error } = await supabase
  .from('blog_pages')
  .upsert(payload, { onConflict: 'id' })
  .select('id, title');

if (error) {
  console.error(`Seed failed: ${error.message}`);
  if (error.code) console.error(`Code: ${error.code}`);
  if (error.hint) console.error(`Hint: ${error.hint}`);
  process.exit(1);
}

console.log(`Seeded ${data.length} post(s):`);
for (const row of data) {
  console.log(`  - ${row.id}: ${row.title}`);
}
