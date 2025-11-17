import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebComponentsPageComponent } from './web-components-page.component';
import { WebComponentsRoutingModule } from './web-components-routing.module';

@NgModule({
  declarations: [
    WebComponentsPageComponent
  ],
  imports: [
    CommonModule,
    WebComponentsRoutingModule
  ],
  exports: [
    WebComponentsPageComponent
  ],
  schemas:[
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class WebComponentsModule { }

