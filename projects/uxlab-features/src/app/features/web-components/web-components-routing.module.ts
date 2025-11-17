// items-routing.module.ts
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WebComponentsPageComponent } from './web-components-page.component';

 const routes: Routes = [
     {
         path: '',
         component: WebComponentsPageComponent,
     }
 ]

 @NgModule(
    {
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule]
    }
)
 export class WebComponentsRoutingModule { }