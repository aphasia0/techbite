import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { map } from 'rxjs';
import { BlogService } from '../../services/blog.service';
import { SeoService } from '../../services/seo.service';
import { Page } from '../../models/page.model';
import { PageHeaderComponent } from '../page-header/page-header.component';

interface YearGroup {
  year: string;
  pages: Page[];
}

interface StoriesView {
  total: number;
  groups: YearGroup[];
}

@Component({
  selector: 'app-all-stories',
  standalone: true,
  imports: [CommonModule, RouterLink, NzIconModule, PageHeaderComponent],
  templateUrl: './all-stories.component.html',
  styleUrls: ['./all-stories.component.scss'],
})
export class AllStoriesComponent implements OnInit {
  view$ = this.blogService.getPages().pipe(map((pages) => this.toView(pages)));

  constructor(private blogService: BlogService, private seo: SeoService) {}

  ngOnInit(): void {
    this.seo.setPage({
      title: 'All stories',
      description:
        'Every note, experiment and thing worth sharing about Angular, Java, Spring, Web3 and Flutter — newest first.',
      path: '/stories',
    });
  }

  private toView(pages: Page[]): StoriesView {
    const groups = new Map<string, Page[]>();

    for (const page of pages) {
      const year = page.date ? page.date.slice(0, 4) : 'Undated';
      const group = groups.get(year);
      if (group) {
        group.push(page);
      } else {
        groups.set(year, [page]);
      }
    }

    return {
      total: pages.length,
      groups: [...groups.entries()].map(([year, groupPages]) => ({
        year,
        pages: groupPages,
      })),
    };
  }
}
