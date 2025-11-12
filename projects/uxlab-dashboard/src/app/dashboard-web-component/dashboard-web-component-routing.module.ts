import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardWebComponent } from './dashboard-web-component.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardWebComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardWebComponentRoutingModule { }
