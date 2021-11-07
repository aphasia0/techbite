import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutRoutingModule } from './about-routing.module';
import { AboutComponent } from './about.component';
import {AppCommonModule} from "../../common/common.module";


@NgModule({
  declarations: [
    AboutComponent
  ],
    imports: [
        CommonModule,
        AboutRoutingModule,
        AppCommonModule
    ]
})
export class AboutModule { }
