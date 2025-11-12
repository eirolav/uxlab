import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MasterComponent } from './master.component';
import { LayoutModule } from '../layout/layout.module';

@NgModule({
  declarations: [
    MasterComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    LayoutModule
  ],
  exports: [
    MasterComponent
  ]
})
export class MasterModule { }
