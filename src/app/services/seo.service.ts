import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

export interface SeoArticle {
  headline: string;
  description: string;
  image?: string;
  datePublished?: string;
  dateModified?: string;
}

export interface SeoFaqItem {
  question: string;
  answer: string;
}

export interface SeoOptions {
  /** Page title without the site suffix. */
  title: string;
  /** Meta description, kept under ~160 characters. */
  description: string;
  /** Route path starting with a slash, e.g. "/blog/java21-virtual-thread". */
  path: string;
  /** Relative asset path or absolute URL. */
  image?: string;
  type?: 'website' | 'article';
  noindex?: boolean;
  /** Adds BlogPosting + BreadcrumbList structured data. */
  article?: SeoArticle;
  /** Adds Person structured data for the about page. */
  person?: boolean;
  /** Adds FAQPage structured data. */
  faq?: SeoFaqItem[];
}

/** Centralised metadata handling: titles, description, canonical, Open Graph and JSON-LD. */
@Injectable({ providedIn: 'root' })
export class SeoService {
  static readonly origin = 'https://antoniogiordano.dev';

  private readonly siteName = 'Techbite';
  private readonly defaultImage = `${SeoService.origin}/assets/img/coding.jpeg`;
  private readonly jsonLdId = 'seo-json-ld';

  constructor(
    private readonly title: Title,
    private readonly meta: Meta,
    @Inject(DOCUMENT) private readonly document: Document
  ) {}

  setPage(options: SeoOptions): void {
    const fullTitle = this.fullTitle(options.title);
    const url = this.absoluteUrl(options.path);
    const image = this.absoluteImage(options.image);
    const description = this.normalizeDescription(options.description);

    this.title.setTitle(fullTitle);
    this.meta.updateTag({ name: 'description', content: description });
    this.meta.updateTag({ name: 'author', content: 'Antonio Giordano' });
    this.meta.updateTag({
      name: 'robots',
      content: options.noindex ? 'noindex,follow' : 'index,follow,max-image-preview:large',
    });

    this.meta.updateTag({ property: 'og:site_name', content: this.siteName });
    this.meta.updateTag({ property: 'og:title', content: fullTitle });
    this.meta.updateTag({ property: 'og:description', content: description });
    this.meta.updateTag({ property: 'og:type', content: options.type ?? 'website' });
    this.meta.updateTag({ property: 'og:url', content: url });
    this.meta.updateTag({ property: 'og:image', content: image });
    this.meta.updateTag({ property: 'og:locale', content: 'en_US' });

    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: fullTitle });
    this.meta.updateTag({ name: 'twitter:description', content: description });
    this.meta.updateTag({ name: 'twitter:image', content: image });

    this.setCanonical(url);
    this.setStructuredData(options, url, image, description);
  }

  /** Replaces any previously injected JSON-LD block. */
  setJsonLd(data: unknown): void {
    this.clearJsonLd();
    const script = this.document.createElement('script');
    script.id = this.jsonLdId;
    script.type = 'application/ld+json';
    script.text = JSON.stringify(data);
    this.document.head.appendChild(script);
  }

  private setStructuredData(
    options: SeoOptions,
    url: string,
    image: string,
    description: string
  ): void {
    const graph: Record<string, unknown>[] = [];

    if (options.article) {
      graph.push(this.articleSchema(options.article, url, image, description));
      graph.push(this.breadcrumbSchema(options.article.headline));
    }

    if (options.person) {
      graph.push(this.personSchema());
    }

    if (options.faq?.length) {
      graph.push({
        '@type': 'FAQPage',
        mainEntity: options.faq.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer,
          },
        })),
      });
    }

    if (graph.length === 0) {
      this.clearJsonLd();
      return;
    }

    this.setJsonLd({ '@context': 'https://schema.org', '@graph': graph });
  }

  private articleSchema(
    article: SeoArticle,
    url: string,
    image: string,
    description: string
  ): Record<string, unknown> {
    const published = this.toIsoDate(article.datePublished);
    const modified = this.toIsoDate(article.dateModified ?? article.datePublished);

    return {
      '@type': 'BlogPosting',
      headline: article.headline,
      description: article.description || description,
      image: this.absoluteImage(article.image ?? image),
      mainEntityOfPage: { '@type': 'WebPage', '@id': url },
      url,
      datePublished: published,
      dateModified: modified,
      inLanguage: 'en',
      author: {
        '@type': 'Person',
        name: 'Antonio Giordano',
        url: `${SeoService.origin}/about`,
      },
      publisher: {
        '@type': 'Organization',
        name: this.siteName,
        url: SeoService.origin,
        logo: {
          '@type': 'ImageObject',
          url: `${SeoService.origin}/assets/img/default-no-text.svg`,
        },
      },
    };
  }

  private breadcrumbSchema(articleTitle: string): Record<string, unknown> {
    return {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: `${SeoService.origin}/home`,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Stories',
          item: `${SeoService.origin}/stories`,
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: articleTitle,
        },
      ],
    };
  }

  private personSchema(): Record<string, unknown> {
    return {
      '@type': 'Person',
      name: 'Antonio Giordano',
      url: `${SeoService.origin}/about`,
      jobTitle: 'Software Developer',
      description:
        'Full stack developer from Italy writing about Angular, Java, Spring and software engineering.',
      knowsAbout: ['Angular', 'Java', 'Spring', 'Web3', 'Solidity', 'Flutter'],
      sameAs: [
        'https://github.com/aphasia0',
        'https://www.linkedin.com/in/antonio-giordano-b1673a36/',
        'https://twitter.com/aphasia0',
      ],
    };
  }

  private setCanonical(url: string): void {
    let link = this.document.querySelector<HTMLLinkElement>('link[rel="canonical"]');

    if (!link) {
      link = this.document.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.document.head.appendChild(link);
    }

    link.setAttribute('href', url);
  }

  private clearJsonLd(): void {
    this.document.getElementById(this.jsonLdId)?.remove();
  }

  private fullTitle(title: string): string {
    const clean = title.trim();
    if (!clean || clean.toLowerCase().includes(this.siteName.toLowerCase())) {
      return clean || this.siteName;
    }
    return `${clean} — ${this.siteName}`;
  }

  private normalizeDescription(description: string): string {
    const text = (description || '').replace(/\s+/g, ' ').trim();
    if (text.length <= 160) {
      return text;
    }
    return `${text.slice(0, 157).trimEnd()}…`;
  }

  private absoluteUrl(path: string): string {
    const clean = path.startsWith('/') ? path : `/${path}`;
    return `${SeoService.origin}${clean}`;
  }

  private absoluteImage(image?: string): string {
    if (!image) {
      return this.defaultImage;
    }
    if (/^https?:\/\//i.test(image)) {
      return image;
    }
    return new URL(image.replace(/^\//, ''), `${SeoService.origin}/`).toString();
  }

  private toIsoDate(value?: string): string | undefined {
    if (!value) {
      return undefined;
    }
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? value : date.toISOString();
  }
}
