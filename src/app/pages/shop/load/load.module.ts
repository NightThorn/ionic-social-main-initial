import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoadPageRoutingModule } from './load-routing.module';

import { LoadPage } from './load.page';
import { BuymodalPageModule } from '../../buymodal/buymodal.module';
import { XpmodalPageModule } from '../../xpmodal/xpmodal.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoadPageRoutingModule,
    BuymodalPageModule,
    XpmodalPageModule
  ],
  declarations: [LoadPage]
})
export class LoadPageModule {}
