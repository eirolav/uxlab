import { Routes } from '@angular/router';
import { MasterComponent } from './master/master.component';
import { HomePageComponent } from './home-page/home-page.component';
import { loadRemoteModule } from '@angular-architects/module-federation';

export const routes: Routes = [
  {
    path: '',
    component: MasterComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        component: HomePageComponent
      },
      {
        path: 'dashboard',
        loadChildren: () => 
          loadRemoteModule({
            type: 'module',
            remoteEntry: 'http://localhost:4201/remoteEntry.js',
            exposedModule: './uxlab-DashboardModule'
          })
          .then(m => m.DashboardModule)
      },
      {
        path: 'dashboard-web-component',
        loadChildren: () => 
          loadRemoteModule({
            type: 'module',
            remoteEntry: 'http://localhost:4201/remoteEntry.js',
            exposedModule: './uxlab-DashboardWebComponentModule'
          })
          .then(m => m.DashboardWebComponentModule)
      }
    ]
  }
];
