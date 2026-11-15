import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { BlogPageComponent } from './pages/blog-page/blog-page.component';
import { UploadComponent } from './pages/upload/upload.component';
import { MyProjectsComponent } from './pages/my-projects/my-projects.component';
import { AboutComponent } from './pages/about/about.component';
import { AllStoriesComponent } from './pages/all-stories/all-stories.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/home' },
  { path: 'home', component: HomeComponent },
  { path: 'stories', component: AllStoriesComponent },
  { path: 'blog/:id', component: BlogPageComponent },
  { path: 'pdf-remove-password', component: UploadComponent },
  { path: 'my-projects', component: MyProjectsComponent },
  { path: 'about', component: AboutComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
