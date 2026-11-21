import type { Story } from './sources.ts';

export function buildSourceLabels(stories: Story[]): Map<string, string> {
  const labels = new Map<string, string>();

  for (const story of stories) {
    const source = story.source.trim() || shortUrlLabel(story.url);
    const title = truncate(story.title, 70);
    labels.set(
      normalizeUrl(story.url),
      truncate(title ? `${source} — ${title}` : source, 100),
    );
  }

  return labels;
}

/**
 * Keeps links functional but replaces long visible URLs with compact labels:
 *   [https://very-long-url](https://very-long-url) -> [host.com](https://very-long-url)
 *   https://very-long-url -> [Source — Title](https://very-long-url)
 *
 * Code blocks and inline code are left untouched.
 */
export function compactLinks(
  markdown: string,
  labels: Map<string, string>,
): string {
  const segments = markdown.split(/(```[\s\S]*?```|`[^`\n]*`)/g);

  return segments
    .map((segment, index) => {
      if (index % 2 === 1) {
        return segment;
      }

      let result = segment.replace(
        /(?<!!)\[([^\]]*)\]\((https?:\/\/[^)\s]+)\)/g,
        (_match, label: string, url: string) => {
          const known = labels.get(normalizeUrl(url));
          const nextLabel = known ??
            (isUrl(label) || label.length > 80
              ? shortUrlLabel(url)
              : truncate(label, 80));
          return `[${nextLabel}](${url})`;
        },
      );

      result = result.replace(
        /(^|[\s>])(https?:\/\/[^\s<>()]+)/g,
        (_match, prefix: string, url: string) => {
          const trailing = url.match(/[.,;:!?]+$/)?.[0] ?? '';
          const cleanUrl = trailing ? url.slice(0, -trailing.length) : url;
          const known = labels.get(normalizeUrl(cleanUrl));
          return `${prefix}[${
            known ?? shortUrlLabel(cleanUrl)
          }](${cleanUrl})${trailing}`;
        },
      );

      return result;
    })
    .join('');
}

function shortUrlLabel(value: string): string {
  try {
    return new URL(value).hostname.replace(/^www\./, '');
  } catch {
    return 'source';
  }
}

function normalizeUrl(value: string): string {
  try {
    const url = new URL(value.trim());
    url.hash = '';
    url.hostname = url.hostname.replace(/^www\./, '');
    return url.toString().replace(/\/$/, '');
  } catch {
    return value.trim();
  }
}

function isUrl(value: string): boolean {
  return /^https?:\/\//i.test(value.trim());
}

function truncate(value: string, max: number): string {
  const text = value.replace(/\s+/g, ' ').trim();
  return text.length > max ? `${text.slice(0, max - 1).trimEnd()}…` : text;
}
