import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardHomePageComponent } from './pages/dashboard-home-page/dashboard-home-page.component';
import { ReportsListComponent } from './components/reports-list/reports-list.component';
import { FavoriteReportsComponent } from './components/favorite-reports/favorite-reports.component';
import { NewReportsComponent } from './components/new-reports/new-reports.component';

@NgModule({
  declarations: [
    DashboardHomePageComponent,
    ReportsListComponent,
    FavoriteReportsComponent,
    NewReportsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    DashboardRoutingModule
  ],
  exports: [
    DashboardHomePageComponent
  ]
})
export class DashboardModule { }
