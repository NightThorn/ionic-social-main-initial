import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GrindingPageRoutingModule } from './grinding-routing.module';

import { GrindingPage } from './grinding.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GrindingPageRoutingModule
  ],
  declarations: [GrindingPage]
})
export class GrindingPageModule {}
