import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { blogPages, Page } from "./static.pages";
import { Router } from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: false
})
export class AppComponent {
  options: string[] | undefined = [] as any;
  isCollapsed = false;
  isDark: any;
  links: Page[] = blogPages;
  topLinks: Page[] = [];
  olderLinks: Page[] = [];
  model: any;

  constructor(private router: Router) {
    this.initLinks();
  }

  private initLinks() {
    this.links = [...blogPages].sort((a, b) => b.date.localeCompare(a.date));
    this.topLinks = this.links.slice(0, 3);
    this.olderLinks = this.links.slice(3);
  }

  onInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.options = this.links
      ?.map((x) => (x.title ? x.title : ''))
      .filter((x) => x.toUpperCase().includes(value.toUpperCase()));
  }

  search(f: NgForm) {
    const route = this.links?.filter(x => x.title === f.value.search).map(x => 'blog/' + x.id)
    if (route && route.length > 0) {
      this.router.navigate(route).then(
        () => this.model = ''
      );
    }
  }

  call(ss: any) {
    ss ? document.documentElement.classList.add('dark') : document.documentElement.classList.remove('dark')
  }

  test() {
    if (this.shouldBeClosed()) {
      this.isCollapsed = true;
    }
  }

  shouldBeClosed(): boolean {
    return window.innerWidth < 768;
  }

  select() {
    this.options = this.links
      ?.map((x) => (x.title ? x.title : ''));
  }
}
