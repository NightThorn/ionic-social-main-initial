import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BadgesPageRoutingModule } from './badges-routing.module';

import { BadgesPage } from './badges.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { BuymodalPageModule } from '../../buymodal/buymodal.module';
import { XpmodalPageModule } from '../../xpmodal/xpmodal.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    BadgesPageRoutingModule,
    BuymodalPageModule,
    XpmodalPageModule
  ],
  declarations: [BadgesPage]
})
export class BadgesPageModule {}
