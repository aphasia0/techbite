import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss']
})
export class PageHeaderComponent implements OnInit {
  @Input()
  title: string|undefined;
  @Input()
  subtitle: string|undefined;

  @Input()
  image: string|undefined;
  //cover or scale-down
  @Input()
  imageStyle: string = 'cover';

  constructor() { }

  ngOnInit(): void {
  }

}
