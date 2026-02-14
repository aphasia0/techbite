import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss'],
  standalone: false
})
export class PageHeaderComponent implements OnInit {
  @Input()
  title: string | undefined;
  @Input()
  subtitle: string | undefined;

  @Input()
  image: string | undefined;
  //cover or scale-down
  @Input()
  imageStyle: string | undefined;
  @Input()
  date: string | undefined;

  constructor() {
  }

  ngOnInit(): void {
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
