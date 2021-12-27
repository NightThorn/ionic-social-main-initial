import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { XpmodalPageRoutingModule } from './xpmodal-routing.module';

import { XpmodalPage } from './xpmodal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    XpmodalPageRoutingModule
  ],
  declarations: [XpmodalPage]
})
export class XpmodalPageModule { }
