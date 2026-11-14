import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { PageHeaderComponent } from '../page-header/page-header.component';

interface Project {
  name: string;
  description: string;
  url: string;
}

@Component({
  selector: 'app-my-projects',
  standalone: true,
  imports: [CommonModule, NzIconModule, PageHeaderComponent],
  templateUrl: './my-projects.component.html',
  styleUrls: ['./my-projects.component.scss'],
})
export class MyProjectsComponent {
  projects: Project[] = [
    {
      name: 'Soundpad',
      description: 'A soundboard app created for kids who need some special assistance. It features a simple interface with large buttons and colorful icons, making it easy for children to use and enjoy. You can build a custom bluetooth keyboard and use it with this app.',
      url: 'https://soundpad.antoniogiordano.dev/',
    },
    {
      name: 'Vibefolio',
      description: 'A portfolio template built with modern web technologies. Showcase your work with style and elegance.',
      url: 'https://vibefolio.antoniogiordano.dev/',
    },
  ];
}
