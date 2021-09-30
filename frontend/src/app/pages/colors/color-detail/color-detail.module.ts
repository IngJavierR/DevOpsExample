import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ColorDetailRoutingModule } from './color-detail-routing.module';
import { ColorDetailComponent } from './color-detail.component';
import { CHILD_IMPORTS } from 'src/app/app.child.imports';
import { MatListModule } from '@angular/material/list';


@NgModule({
  declarations: [ColorDetailComponent],
  imports: [
    CommonModule,
    ColorDetailRoutingModule,
    CHILD_IMPORTS,
    MatListModule
  ]
})
export class ColorDetailModule { }
