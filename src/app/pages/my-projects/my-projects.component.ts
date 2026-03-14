import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageHeaderComponent } from '../page-header/page-header.component';

interface Project {
  name: string;
  description: string;
  url: string;
  image: string;
  color: string;
}

@Component({
  selector: 'app-my-projects',
  standalone: true,
  imports: [CommonModule, PageHeaderComponent],
  templateUrl: './my-projects.component.html',
  styleUrls: ['./my-projects.component.scss'],
})
export class MyProjectsComponent {
  projects: Project[] = [
    {
      name: 'Soundpad',
      description: 'A soundboard app created for kids who neeed some special assistance. It features a simple interface with large buttons and colorful icons, making it easy for children to use and enjoy. You can build a custom bluetooth keyboard and use it with this app.',
      url: 'https://soundpad.antoniogiordano.dev/',
      image: 'assets/img/soundpad.png',
      color: '#8b5cf6'
    },
    {
      name: 'Vibefolio',
      description: 'A portfolio template built with modern web technologies. Showcase your work with style and elegance.',
      url: 'https://vibefolio.antoniogiordano.dev/',
      image: 'assets/img/vibefolio.png',
      color: '#06b6d4'
    }
  ];
}
