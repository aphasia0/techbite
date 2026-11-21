import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { PageHeaderComponent } from '../page-header/page-header.component';
import { SeoService } from '../../services/seo.service';

interface Project {
  name: string;
  description: string;
  technologies: string;
  url: string;
}

@Component({
  selector: 'app-my-projects',
  standalone: true,
  imports: [CommonModule, NzIconModule, PageHeaderComponent],
  templateUrl: './my-projects.component.html',
  styleUrls: ['./my-projects.component.scss'],
})
export class MyProjectsComponent implements OnInit {
  projects: Project[] = [
    {
      name: 'Soundpad',
      description:
        'A soundboard app created for kids who need some special assistance. It pairs with a custom Bluetooth keyboard and shows large, colorful buttons that are easy to hit, so children can trigger sounds and phrases during play or learning activities. The interface stays intentionally simple: one screen, big targets and no configuration required.',
      technologies: 'Flutter · Bluetooth · Accessibility',
      url: 'https://soundpad.antoniogiordano.dev/',
    },
    {
      name: 'Vibefolio',
      description:
        'A portfolio template for developers and designers who want to publish their work quickly. It focuses on readable typography, fast page loads and a structure that is easy to adapt: projects, an about section and contact links, all built with modern web tooling and deployable in a few minutes.',
      technologies: 'Angular · TypeScript · Tailwind CSS',
      url: 'https://vibefolio.antoniogiordano.dev/',
    },
  ];

  constructor(private seo: SeoService) {}

  ngOnInit(): void {
    this.seo.setPage({
      title: 'Projects',
      description:
        'Side projects by Antonio Giordano, including Soundpad, an accessible soundboard for children, and Vibefolio, a modern portfolio template.',
      path: '/my-projects',
    });
  }
}
