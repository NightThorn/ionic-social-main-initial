import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MiscPageRoutingModule } from './misc-routing.module';

import { MiscPage } from './misc.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { MiscmodalPageModule } from '../../miscmodal/miscmodal.module';
import { XpmodalPageModule } from '../../xpmodal/xpmodal.module';
import { TicketmodalPageModule } from '../../ticketmodal/ticketmodal.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ComponentsModule,
    IonicModule,
    MiscPageRoutingModule,
    MiscmodalPageModule,
    XpmodalPageModule,
    TicketmodalPageModule
  ],
  declarations: [MiscPage]
})
export class MiscPageModule { }
