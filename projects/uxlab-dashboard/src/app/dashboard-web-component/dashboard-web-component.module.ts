import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { DashboardWebComponentRoutingModule } from './dashboard-web-component-routing.module';
import { DashboardWebComponent } from './dashboard-web-component.component';

@NgModule({
  declarations: [
    DashboardWebComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    DashboardWebComponentRoutingModule
  ],
  exports: [
    DashboardWebComponent
  ]
})
export class DashboardWebComponentModule { }
