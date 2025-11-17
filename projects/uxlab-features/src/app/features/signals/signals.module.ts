import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignalsPageComponent } from './signals-page.component';
import { SignalsRoutingModule } from './signals-routing.module';

@NgModule({
  declarations: [
    SignalsPageComponent
  ],
  imports: [
    CommonModule,
    SignalsRoutingModule
  ],
  exports: [
    SignalsPageComponent
  ],
  schemas:[
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class SignalsModule { }

