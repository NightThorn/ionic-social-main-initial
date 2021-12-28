import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GiveawaysPageRoutingModule } from './giveaways-routing.module';

import { GiveawaysPage } from './giveaways.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GiveawaysPageRoutingModule
  ],
  declarations: [GiveawaysPage]
})
export class GiveawaysPageModule {}
