import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { map } from 'rxjs';
import { BlogService } from '../../services/blog.service';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, NzIconModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  latestPosts$ = this.blogService.getPages().pipe(map((pages) => pages.slice(0, 3)));

  constructor(private blogService: BlogService, private seo: SeoService) {}

  ngOnInit(): void {
    this.seo.setPage({
      title: 'Techbite — Angular, Java and software engineering notes',
      description:
        'Personal notes on Angular, Java, Spring, Web3 and Flutter by Antonio Giordano, a full stack developer from Italy.',
      path: '/home',
      image: 'assets/img/coding.jpeg',
    });
  }
}
