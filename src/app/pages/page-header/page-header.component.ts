import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-page-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss'],
})
export class PageHeaderComponent {
  @Input() title: string | undefined;
  @Input() subtitle: string | undefined;
  @Input() image: string | undefined;
  @Input() imageStyle: string | undefined;
  @Input() date: string | undefined;

  get formattedDate(): string {
    if (!this.date) return '';
    return new Date(this.date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }
}
