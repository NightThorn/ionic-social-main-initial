import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreategroupPageRoutingModule } from './creategroup-routing.module';

import { CreategroupPage } from './creategroup.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    CreategroupPageRoutingModule
  ],
  declarations: [CreategroupPage]
})
export class CreategroupPageModule {}
