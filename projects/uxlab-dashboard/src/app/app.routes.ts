import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
  }
  ,
  {
    path: 'webcomp',
    loadChildren: () => import('./dashboard-web-component/dashboard-web-component.module').then(m => m.DashboardWebComponentModule)
  }
];
