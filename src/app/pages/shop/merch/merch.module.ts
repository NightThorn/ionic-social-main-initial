import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MerchPageRoutingModule } from './merch-routing.module';

import { MerchPage } from './merch.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ComponentsModule,
    IonicModule,
    MerchPageRoutingModule
  ],
  declarations: [MerchPage]
})
export class MerchPageModule {}
