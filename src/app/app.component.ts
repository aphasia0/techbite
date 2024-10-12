import {Component} from '@angular/core';
import {NgForm} from '@angular/forms';
import {blogPages, Page} from "./static.pages";
import {Router} from "@angular/router";
import { PrimeNGConfig } from 'primeng/api';
import { definePreset } from 'primeng/themes';
import { Nora } from 'primeng/themes/nora';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  options: string[] | undefined = [] as any;
  isCollapsed = false;
  isDark: any;
  links: Page[] = blogPages;
  model:any;
  

  constructor(private router: Router,private config: PrimeNGConfig) {
    this.config.theme.set({ preset: Nora ,
            options: {
                darkModeSelector: '.dark',
                cssLayer: {
                  name: 'primeng',
                  order: 'tailwind-base, primeng, tailwind-utilities'
              }
            }});
  }

  onInput(event: Event): void {

    const value = (event.target as HTMLInputElement).value;
    this.options = this.links
      ?.map((x) => (x.title ? x.title : ''))
      .filter((x) => x.toUpperCase().includes(value.toUpperCase()));
  }

  search(f: NgForm) {
    const route = this.links?.filter(x => x.title === f.value.search).map(x => 'blog/'+x.id)
    console.log(route)
    if (route) {
      this.router.navigate(route).then(
         () => this.model = ''
      );
    }

  }

  call(ss: any) {
    ss ? document.documentElement.classList.add('dark') : document.documentElement.classList.remove('dark')
  }

  test() {
    if (this.shouldBeClosed()) {
      this.isCollapsed = true;  //We close automatically the sidebare for lower resolution
    }
  }

  shouldBeClosed(): boolean {
    return window.innerWidth < 768;
  }

  select() {
    this.options = this.links
      ?.map((x) => (x.title ? x.title : ''));
  }
}
