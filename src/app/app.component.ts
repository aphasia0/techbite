import {Component} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import {ScullyRoute, ScullyRoutesService} from '@scullyio/ng-lib';
import {Observable} from 'rxjs';
import {filter, map, tap} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  options: string[] | undefined = [] as any;
  isCollapsed = false;

  links: ScullyRoute[] | undefined;
  isDark: any;

  constructor(private scully: ScullyRoutesService, private router: Router) {

    this.scully.available$
      .pipe(map((routes) => routes.filter((route) => route.route.startsWith('/blog/'))))
      .subscribe((x) => (this.links = x));
  }

  onInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.options = this.links
      ?.map((x) => (x.title ? x.title : ''))
      .filter((x) => x.toUpperCase().includes(value.toUpperCase()));
  }

  search(f: NgForm) {
    const route = this.links?.filter(x => x.title === f.value.search).map(x => x.route)
    console.log(route)
    if (route) {
      this.router.navigate(route);
    }

  }

  call(ss: any) {
    console.log("",ss)
    console.log("",this.isDark)
    ss ? document.documentElement.classList.add('dark') : document.documentElement.classList.remove('dark')
  }
}
