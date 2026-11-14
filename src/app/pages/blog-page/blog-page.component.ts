import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MarkdownModule } from 'ngx-markdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { Subscription } from 'rxjs';
import { blogPages, Page } from '../../static.pages';
import { PageHeaderComponent } from '../page-header/page-header.component';

@Component({
  selector: 'app-blog-page',
  standalone: true,
  imports: [MarkdownModule, PageHeaderComponent, RouterLink, NzIconModule],
  templateUrl: './blog-page.component.html',
  styleUrls: ['./blog-page.component.scss'],
})
export class BlogPageComponent implements OnInit, OnDestroy {
  private sub: Subscription | undefined;
  page: Page | undefined;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.sub = this.route.params.subscribe((params) => {
      const id = params['id'];
      this.page = blogPages.find((page) => page.id === id);
      if (!this.page) {
        this.page = {
          id,
          title: 'Sorry, page not found',
          image: 'assets/img/sorry.jpg',
          subtitle: '',
          filename: '',
          imageStyle: 'cover',
          date: '',
        };
      }
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
