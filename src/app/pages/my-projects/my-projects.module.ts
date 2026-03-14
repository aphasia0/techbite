import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MyProjectsRoutingModule } from './my-projects-routing.module';
import { MyProjectsComponent } from './my-projects.component';
import { PageHeaderComponent } from '../page-header/page-header.component';


@NgModule({
  declarations: [
    MyProjectsComponent,
    PageHeaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MyProjectsRoutingModule
  ]
})
export class MyProjectsModule { }
