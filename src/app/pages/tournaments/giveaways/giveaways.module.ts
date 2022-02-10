import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GiveawaysPageRoutingModule } from './giveaways-routing.module';

import { GiveawaysPage } from './giveaways.page';
import { EntergiveawaymodalPageModule } from '../../entergiveawaymodal/entergiveawaymodal.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EntergiveawaymodalPageModule,
    GiveawaysPageRoutingModule
  ],
  declarations: [GiveawaysPage]
})
export class GiveawaysPageModule { }
