import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BuymodalPageRoutingModule } from './buymodal-routing.module';

import { BuymodalPage } from './buymodal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    BuymodalPageRoutingModule
  ],
  declarations: [BuymodalPage]
})
export class BuymodalPageModule {}
