import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { blogPages, Page } from './static.pages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: false,
})
export class AppComponent {
  options: string[] = [];
  links: Page[] = [...blogPages].sort((a, b) => b.date.localeCompare(a.date));
  topLinks: Page[] = this.links.slice(0, 3);
  model = '';
  isMenuOpen = false;
  isSearchOpen = false;
  currentYear = new Date().getFullYear();

  constructor(private router: Router) {}

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
