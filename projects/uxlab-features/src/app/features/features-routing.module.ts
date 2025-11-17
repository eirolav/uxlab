// items-routing.module.ts
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FeaturesComponent } from './features/features.component';

 const featuresRoutes: Routes = [
     {
         path: '',
         component: FeaturesComponent,
         children: [
            {
                path: '',
                redirectTo: "signals",
                pathMatch: "full"
            },
            {
                path: 'signals',
                loadChildren: () => import('./signals/signals.module').then(m => m.SignalsModule)
            },
            {
                path: 'web-components',
                loadChildren: () => import('./web-components/web-components.module').then(m => m.WebComponentsModule)
            }
        ]
     }
 ]

 @NgModule(
    {
        imports: [RouterModule.forChild(featuresRoutes)],
        exports: [RouterModule]
    }
)
 export class FeaturesRoutingModule { }