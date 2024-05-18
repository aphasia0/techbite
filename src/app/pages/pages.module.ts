import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MarkdownModule} from "ngx-markdown";
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./home/home.component";
import {PageHeaderComponent} from "./page-header/page-header.component";
import {BlogPageComponent} from "./blog-page/blog-page.component";
import { DarkModeSwitchComponent } from './dark-mode-switch/dark-mode-switch.component';
import {NzSwitchModule} from "ng-zorro-antd/switch";
import {FormsModule} from "@angular/forms";
import {NzIconModule} from "ng-zorro-antd/icon";


const routes: Routes = [
  {path: 'blog/:id', component: BlogPageComponent},
  {path: 'home', component: HomeComponent},
  {path: '', redirectTo: 'home', pathMatch: 'full'},


];

@NgModule({
    declarations: [
        BlogPageComponent,
        HomeComponent,
        PageHeaderComponent,
        DarkModeSwitchComponent,

    ],
    exports: [
        DarkModeSwitchComponent
    ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    MarkdownModule.forChild(),
    NzSwitchModule,
    FormsModule,
    NzIconModule
  ]
})
export class PagesModule {
}
