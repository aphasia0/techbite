import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarkdownModule } from 'ngx-markdown';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PageHeaderComponent } from './page-header/page-header.component';
import { BlogPageComponent } from './blog-page/blog-page.component';
import { DarkModeSwitchComponent } from './dark-mode-switch/dark-mode-switch.component';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { FormsModule } from '@angular/forms';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { UploadComponent } from './upload/upload.component';
import { MyProjectsComponent } from './my-projects/my-projects.component';
import { ProgressBar } from 'primeng/progressbar';
import { ButtonDirective } from 'primeng/button';
import { Steps } from 'primeng/steps';

const routes: Routes = [
  { path: 'blog/:id', component: BlogPageComponent },
  { path: 'home', component: HomeComponent },
  { path: 'pdf-remove-password', component: UploadComponent },
  { path: 'my-projects', component: MyProjectsComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  declarations: [
    BlogPageComponent,
    HomeComponent,
    PageHeaderComponent,
    DarkModeSwitchComponent,
    MyProjectsComponent,
    UploadComponent,
  ],
  exports: [DarkModeSwitchComponent, PageHeaderComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    MarkdownModule.forChild(),
    NzSwitchModule,
    FormsModule,
    NzIconModule,
    ProgressBar,
    ButtonDirective,
    Steps,
  ],
})
export class PagesModule {}
