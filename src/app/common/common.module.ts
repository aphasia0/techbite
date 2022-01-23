import { NgModule } from '@angular/core';
import { PageHeaderComponent } from './page-header/page-header.component';
import {CommonModule} from "@angular/common";



@NgModule({
  declarations: [
    PageHeaderComponent
  ],
  exports: [
    PageHeaderComponent
  ],
  imports: [
    CommonModule
  ]
})
export class AppCommonModule { }
