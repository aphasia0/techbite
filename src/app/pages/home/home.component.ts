import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { blogPages, Page } from '../../static.pages';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, NzIconModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  latestPosts: Page[] = [...blogPages]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 3);
}
