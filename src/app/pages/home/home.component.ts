import { Component, OnInit } from '@angular/core';
import { blogPages, Page } from '../../static.pages';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  latestPosts: Page[];

  constructor() {
    // Sort by date descending and take the first 3
    this.latestPosts = [...blogPages]
      .sort((a, b) => b.date.localeCompare(a.date))
      .slice(0, 3);
  }
}
