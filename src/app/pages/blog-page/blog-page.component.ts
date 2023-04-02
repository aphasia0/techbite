import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {blogPages, Page} from "../../static.pages";


@Component({
  selector: 'app-blog-page',
  templateUrl: './blog-page.component.html',
  styleUrls: ['./blog-page.component.scss']
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
          imageStyle: "cover"
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}

