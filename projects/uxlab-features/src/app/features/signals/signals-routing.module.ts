// items-routing.module.ts
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignalsPageComponent } from './signals-page.component';

 const routes: Routes = [
     {
         path: '',
         component: SignalsPageComponent,
     }
 ]

 @NgModule(
    {
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule]
    }
)
 export class SignalsRoutingModule { }