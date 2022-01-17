import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GroupadminsPageRoutingModule } from './groupadmins-routing.module';

import { GroupadminsPage } from './groupadmins.page';
import { AddadminPageModule } from '../addadmin/addadmin.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GroupadminsPageRoutingModule,
    AddadminPageModule
  ],
  declarations: [GroupadminsPage]
})
export class GroupadminsPageModule {}
