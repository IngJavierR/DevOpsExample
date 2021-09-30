import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ColorDetailComponent } from './color-detail.component';

const routes: Routes = [{ path: '', component: ColorDetailComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ColorDetailRoutingModule { }
