import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription, map } from 'rxjs';
import { BlogService } from './services/blog.service';
import { Page } from './models/page.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: false,
})
export class AppComponent implements OnInit, OnDestroy {
  options: string[] = [];
  links: Page[] = [];
  topLinks$ = this.blogService.getPages().pipe(map((pages) => pages.slice(0, 3)));
  model = '';
  isMenuOpen = false;
  isSearchOpen = false;
  currentYear = new Date().getFullYear();
  private sub: Subscription | undefined;

  constructor(private router: Router, private blogService: BlogService) {}

  ngOnInit(): void {
    this.sub = this.blogService.getPages().subscribe((pages) => {
      this.links = pages;
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  onInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.options = this.links
      .map((page) => page.title)
      .filter((title) => title.toLowerCase().includes(value.toLowerCase()));
    this.isSearchOpen = true;
  }

  search(form: NgForm): void {
    const query = (form.value.search || '').trim().toLowerCase();
    const match = this.links.find((page) => page.title.toLowerCase().includes(query));
    if (query && match) {
      this.openPage(match.id);
    }
  }

  selectOption(title: string): void {
    const match = this.links.find((page) => page.title === title);
    if (match) {
      this.openPage(match.id);
    }
  }

  select(): void {
    this.options = this.links.map((page) => page.title);
    this.isSearchOpen = true;
  }

  closeNavigation(): void {
    this.isMenuOpen = false;
    this.isSearchOpen = false;
  }

  private openPage(id: string): void {
    this.model = '';
    this.closeNavigation();
    void this.router.navigate(['blog', id]);
  }
}
