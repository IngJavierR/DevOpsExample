import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GuardService } from './services/guard.service';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'home',
    canActivate: [GuardService],
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'colors',
    canActivate: [GuardService],
    loadChildren: () => import('./pages/colors/colors.module').then(m => m.ColorsModule)
  },
  {
    path: 'colors/:id',
    loadChildren: () => import('./pages/colors/color-detail/color-detail.module').then(m => m.ColorDetailModule)
  },
  {
    path: '**',
    redirectTo: '/login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
