import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { blogPages, Page } from '../../static.pages';
import { PageHeaderComponent } from '../page-header/page-header.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, PageHeaderComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  latestPosts: Page[];

  constructor() {
    this.latestPosts = [...blogPages]
      .sort((a, b) => b.date.localeCompare(a.date))
      .slice(0, 3);
  }
}
