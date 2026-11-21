import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageHeaderComponent } from '../page-header/page-header.component';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, PageHeaderComponent],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit {
  constructor(private seo: SeoService) {}

  ngOnInit(): void {
    this.seo.setPage({
      title: 'About Antonio Giordano',
      description:
        'I am Antonio Giordano, a full stack developer from Italy. I write about Angular, Java, Spring, Web3 and Flutter on Techbite.',
      path: '/about',
      person: true,
    });
  }
}
