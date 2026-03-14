import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MarkdownModule } from 'ngx-markdown';
import { Subscription } from "rxjs";
import { blogPages, Page } from "../../static.pages";
import { PageHeaderComponent } from '../page-header/page-header.component';


@Component({
  selector: 'app-blog-page',
  standalone: true,
  imports: [CommonModule, MarkdownModule, PageHeaderComponent],
  templateUrl: './blog-page.component.html',
  styleUrls: ['./blog-page.component.scss'],
})
export class BlogPageComponent implements OnInit, OnDestroy {

  private sub: Subscription | undefined;
  id: string = '';
  page: Page | undefined;

  constructor(
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
      this.page = blogPages.filter(x => x.id === this.id)[0];
      if (!this.page) {
        this.page = {
          id: this.id,
          title: "Sorry, page not found",
          image: "assets/img/sorry.jpg",
          subtitle: "",
          filename: "",
          imageStyle: "cover",
          date: ""
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}

