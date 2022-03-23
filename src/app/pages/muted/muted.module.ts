import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MutedPageRoutingModule } from './muted-routing.module';

import { MutedPage } from './muted.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MutedPageRoutingModule
  ],
  declarations: [MutedPage]
})
export class MutedPageModule {}
