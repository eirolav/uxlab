import { loadRemoteModule } from '@angular-architects/module-federation';
import { Routes } from '@angular/router';

export const federationRoutes: Routes = [
  {
    path: 'dashboard',
    loadChildren: () => 
      loadRemoteModule({
        type: 'module',
        remoteEntry: 'http://localhost:4201/remoteEntry.js',
        exposedModule: './uxlab-DashboardModule'
      })
      .then(m => m.DashboardModule)
  }
];
