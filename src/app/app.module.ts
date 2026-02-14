import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { NgOptimizedImage, registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NzLayoutModule } from "ng-zorro-antd/layout";
import { NzMenuModule } from "ng-zorro-antd/menu";
import { RouterLink, RouterModule, RouterOutlet } from "@angular/router";
import { NzIconModule } from "ng-zorro-antd/icon";
import { NzSwitchModule } from "ng-zorro-antd/switch";
import { NzInputModule } from "ng-zorro-antd/input";
import { NzAutocompleteModule } from "ng-zorro-antd/auto-complete";
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzTooltipModule } from "ng-zorro-antd/tooltip";
import { MarkdownModule } from 'ngx-markdown';
import { PagesModule } from "./pages/pages.module";
import { BlogPageComponent } from './pages/blog-page/blog-page.component';
import { UploadComponent } from './pages/upload/upload.component';
import { HomeOutline } from '@ant-design/icons-angular/icons';


registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    RouterModule.forRoot([]),
    MarkdownModule.forRoot(),

    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NzLayoutModule,
    NzMenuModule,
    RouterLink,
    NzIconModule,
    NzSwitchModule,
    NzInputModule,
    NzAutocompleteModule,
    RouterOutlet,
    NzButtonModule,
    PagesModule,
    NgOptimizedImage,
    UploadComponent,
    NzTooltipModule,

  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
