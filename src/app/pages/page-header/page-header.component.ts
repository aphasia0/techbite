import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-page-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss'],
})
export class PageHeaderComponent implements OnInit {
  @Input() title: string | undefined;
  @Input() subtitle: string | undefined;
  @Input() image: string | undefined;
  @Input() imageStyle: string | undefined;
  @Input() date: string | undefined;

  isRendered = false;

  ngOnInit() {
    this.isRendered = true;
    console.log('PageHeaderComponent initialized with title:', this.title);
  }

  get month(): string {
    if (!this.date) return '';
    const dateObj = new Date(this.date);
    return dateObj.toLocaleString('default', { month: 'short' }).toUpperCase();
  }

  get day(): string {
    if (!this.date) return '';
    const dateObj = new Date(this.date);
    return dateObj.getDate().toString();
  }

  get formattedDate(): string {
    if (!this.date) return '';
    const dateObj = new Date(this.date);
    return dateObj.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  }
}
