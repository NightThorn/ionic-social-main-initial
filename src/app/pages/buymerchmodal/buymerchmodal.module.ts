import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BuymerchmodalPageRoutingModule } from './buymerchmodal-routing.module';

import { BuymerchmodalPage } from './buymerchmodal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    BuymerchmodalPageRoutingModule
  ],
  declarations: [BuymerchmodalPage]
})
export class BuymerchmodalPageModule {}
