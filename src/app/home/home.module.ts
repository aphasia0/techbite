import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import {ButtonModule} from 'primeng/button';
import {AppCommonModule} from "../common/common.module";

@NgModule({
  declarations: [
    HomeComponent
  ],
    imports: [
        CommonModule,
        HomeRoutingModule,
        ButtonModule,
        AppCommonModule
    ]
})
export class HomeModule { }
