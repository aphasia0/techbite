import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { map } from 'rxjs';
import { BlogService } from '../../services/blog.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, NzIconModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  latestPosts$ = this.blogService.getPages().pipe(map((pages) => pages.slice(0, 3)));

  constructor(private blogService: BlogService) {}
}
