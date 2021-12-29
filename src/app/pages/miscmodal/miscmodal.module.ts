import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MiscmodalPageRoutingModule } from './miscmodal-routing.module';

import { MiscmodalPage } from './miscmodal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    MiscmodalPageRoutingModule
  ],
  declarations: [MiscmodalPage]
})
export class MiscmodalPageModule {}
