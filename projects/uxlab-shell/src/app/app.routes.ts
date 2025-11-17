import { Routes } from '@angular/router';
import { MasterComponent } from './master/master.component';
import { HomePageComponent } from './home-page/home-page.component';
import { loadRemoteModule } from '@angular-architects/module-federation';
import { LoginComponent } from './auth/components/login/login.component';
import { ProfileComponent } from './auth/components/profile/profile.component';
import { AuthGuard } from './auth/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    component: MasterComponent,
    canActivate: [AuthGuard],
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
        path: 'profile',
        component: ProfileComponent
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
        path: 'features',
        loadChildren: () => 
          loadRemoteModule({
            type: 'module',
            remoteEntry: 'http://localhost:4202/remoteEntry.js',
            exposedModule: './uxlab-FeaturesModule'
          })
          .then(m => m.FeaturesModule)
      }
    ]
  }
];
