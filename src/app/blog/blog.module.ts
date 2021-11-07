import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ScullyLibModule} from '@scullyio/ng-lib';
import {BlogRoutingModule} from './blog-routing.module';
import {BlogComponent} from './blog.component';
import {NzGridModule} from "ng-zorro-antd/grid";
import {AppCommonModule} from "../common/common.module";

@NgModule({
  declarations: [BlogComponent],
    imports: [CommonModule, BlogRoutingModule, ScullyLibModule, NzGridModule, AppCommonModule],
})
export class BlogModule {}
