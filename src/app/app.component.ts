import { Component } from '@angular/core';
import { ScullyRoute, ScullyRoutesService } from '@scullyio/ng-lib';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  inputValue?: string;
  options: string[] = [];
  isCollapsed = false;

  links$: Observable<ScullyRoute[]> = this.scully.available$.pipe(
    map((routes) => routes.filter((route) => route.route !== '/'))
  );

  constructor(private scully: ScullyRoutesService) {}


  onInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.options = value ? [value, value + value, value + value + value] : [];
  }
}
