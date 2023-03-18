import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MarkdownModule} from "ngx-markdown";
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./home/home.component";
import {PageHeaderComponent} from "./page-header/page-header.component";
import {BlogPageComponent} from "./blog-page/blog-page.component";


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

  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    MarkdownModule.forChild()
  ]
})
export class PagesModule {
}
