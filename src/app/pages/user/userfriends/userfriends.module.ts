import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserfriendsPageRoutingModule } from './userfriends-routing.module';

import { UserfriendsPage } from './userfriends.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    UserfriendsPageRoutingModule
  ],
  declarations: [UserfriendsPage]
})
export class UserfriendsPageModule {}
