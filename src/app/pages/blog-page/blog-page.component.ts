import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MarkdownModule } from 'ngx-markdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { Subscription, switchMap } from 'rxjs';
import { BlogService } from '../../services/blog.service';
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
  page: Page | undefined;

  constructor(private route: ActivatedRoute, private blogService: BlogService) {}

  ngOnInit(): void {
    this.sub = this.route.params
      .pipe(switchMap((params) => this.blogService.getPage(params['id'])))
      .subscribe((page) => {
        this.page = page ?? this.notFoundPage(this.route.snapshot.params['id']);
      });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
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
