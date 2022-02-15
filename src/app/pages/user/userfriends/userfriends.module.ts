import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserfriendsPageRoutingModule } from './userfriends-routing.module';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { UserfriendsPage } from './userfriends.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { UtilsModule } from 'src/app/utils/utils.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    ScrollingModule,
    UtilsModule,
    UserfriendsPageRoutingModule
  ],
  declarations: [UserfriendsPage]
})
export class UserfriendsPageModule { }
