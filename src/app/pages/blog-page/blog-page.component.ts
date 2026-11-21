import { Component, OnDestroy, OnInit, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MarkdownModule } from 'ngx-markdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { Subscription, combineLatest, switchMap } from 'rxjs';
import { BlogService } from '../../services/blog.service';
import { SeoService } from '../../services/seo.service';
import { Page } from '../../models/page.model';
import { PageHeaderComponent } from '../page-header/page-header.component';

@Component({
  selector: 'app-blog-page',
  standalone: true,
  imports: [CommonModule, MarkdownModule, PageHeaderComponent, RouterLink, NzIconModule],
  templateUrl: './blog-page.component.html',
  styleUrls: ['./blog-page.component.scss'],
})
export class BlogPageComponent implements OnInit, OnDestroy {
  private sub: Subscription | undefined;
  private isNotFound = false;

  readonly page = signal<Page | undefined>(undefined);
  readonly related = signal<Page[]>([]);

  /** The article title is rendered as an H1 by the page header, so drop a duplicated markdown heading. */
  readonly body = computed(() =>
    (this.page()?.content ?? '').replace(/^\s*#{1,2}\s+[^\n]*(?:\r?\n)+/, '').trimStart()
  );

  constructor(
    private route: ActivatedRoute,
    private blogService: BlogService,
    private seo: SeoService
  ) {}

  ngOnInit(): void {
    this.sub = combineLatest([
      this.route.params.pipe(switchMap((params) => this.blogService.getPage(params['id']))),
      this.blogService.getPages(),
    ]).subscribe(([page, pages]) => {
      const id = this.route.snapshot.params['id'];
      this.isNotFound = !page;
      this.page.set(page ?? this.notFoundPage(id));
      this.related.set(pages.filter((item) => item.id !== page?.id).slice(0, 3));
      this.applySeo();
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  private applySeo(): void {
    const page = this.page();

    if (!page) {
      return;
    }

    const description =
      page.subtitle || this.excerpt(page.content) || 'Notes on code, tools and software development.';

    this.seo.setPage({
      title: this.isNotFound ? 'Page not found' : page.title,
      description: this.isNotFound
        ? 'The page you are looking for does not exist. Browse all the stories on Techbite instead.'
        : description,
      path: `/blog/${page.id}`,
      image: page.image || undefined,
      type: this.isNotFound ? 'website' : 'article',
      noindex: this.isNotFound,
      article: this.isNotFound
        ? undefined
        : {
            headline: page.title,
            description,
            image: page.image || undefined,
            datePublished: page.date || undefined,
          },
    });
  }

  private excerpt(content: string): string {
    return content
      .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
      .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
      .replace(/[#>*_`~|-]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  private notFoundPage(id: string): Page {
    return {
      id,
      title: 'Sorry, page not found',
      subtitle: '',
      content: '',
      image: 'assets/img/sorry.jpg',
      imageStyle: 'cover',
      date: '',
    };
  }
}
