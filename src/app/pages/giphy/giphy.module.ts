import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GiphyPageRoutingModule } from './giphy-routing.module';

import { GiphyPage } from './giphy.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GiphyPageRoutingModule
  ],
  declarations: [GiphyPage]
})
export class GiphyPageModule {}
