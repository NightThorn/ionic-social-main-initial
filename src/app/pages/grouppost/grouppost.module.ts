import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GrouppostPageRoutingModule } from './grouppost-routing.module';

import { GrouppostPage } from './grouppost.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    GrouppostPageRoutingModule
  ],
  declarations: [GrouppostPage]
})
export class GrouppostPageModule {}
