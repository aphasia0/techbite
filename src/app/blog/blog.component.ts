import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ScullyRoutesService} from "@scullyio/ng-lib";


declare var ng: any;

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
  preserveWhitespaces: true,
  encapsulation: ViewEncapsulation.Emulated

})
export class BlogComponent implements OnInit {
  title: string | undefined;
  description: string | undefined;

  ngOnInit() {}

  constructor(private scully: ScullyRoutesService) {
    scully.getCurrent().subscribe( x => {
      this.title = x.title
      this.description = x.description
      console.log(x.subtitle)
    })
  }
}
