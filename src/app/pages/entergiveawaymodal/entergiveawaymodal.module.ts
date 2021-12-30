import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EntergiveawaymodalPageRoutingModule } from './entergiveawaymodal-routing.module';

import { EntergiveawaymodalPage } from './entergiveawaymodal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    EntergiveawaymodalPageRoutingModule
  ],
  declarations: [EntergiveawaymodalPage]
})
export class EntergiveawaymodalPageModule {}
