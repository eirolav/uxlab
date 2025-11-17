import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeaturesComponent } from './features/features.component';
import { FeaturesRoutingModule } from './features-routing.module';
import { FeaturesNavigationComponent } from './navigation/features-navigation.component';

@NgModule({
  declarations: [
    FeaturesComponent,
    FeaturesNavigationComponent
  ],
  imports: [
    CommonModule,
    FeaturesRoutingModule
  ],
  exports: [
    FeaturesComponent,
    FeaturesNavigationComponent
  ],
  schemas:[
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class FeaturesModule { }

