import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddadminPageRoutingModule } from './addadmin-routing.module';

import { AddadminPage } from './addadmin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddadminPageRoutingModule
  ],
  declarations: [AddadminPage]
})
export class AddadminPageModule {}
