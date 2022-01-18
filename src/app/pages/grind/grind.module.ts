import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GrindPageRoutingModule } from './grind-routing.module';

import { GrindPage } from './grind.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GrindPageRoutingModule
  ],
  declarations: [GrindPage]
})
export class GrindPageModule {}
