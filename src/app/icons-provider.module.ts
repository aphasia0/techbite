import { NgModule } from '@angular/core';
import { NZ_ICONS, NzIconModule } from 'ng-zorro-antd/icon';
import {
  AppstoreOutline,
  ArrowLeftOutline,
  ArrowRightOutline,
  CloseOutline,
  ExportOutline,
  HomeOutline,
  MenuOutline,
  SearchOutline,
  ToolOutline,
} from '@ant-design/icons-angular/icons';

const icons = [
  AppstoreOutline,
  ArrowLeftOutline,
  ArrowRightOutline,
  CloseOutline,
  ExportOutline,
  HomeOutline,
  MenuOutline,
  SearchOutline,
  ToolOutline,
];

@NgModule({
  imports: [NzIconModule],
  exports: [NzIconModule],
  providers: [{ provide: NZ_ICONS, useValue: icons }],
})
export class IconsProviderModule {}
