import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ColorsRoutingModule } from './colors-routing.module';
import { ColorsComponent } from './colors.component';
import { CHILD_IMPORTS } from 'src/app/app.child.imports';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [ColorsComponent],
  imports: [
    CommonModule,
    ColorsRoutingModule,
    CHILD_IMPORTS,
    MatTableModule,
    MatIconModule,
    MatButtonModule
  ]
})
export class ColorsModule { }
