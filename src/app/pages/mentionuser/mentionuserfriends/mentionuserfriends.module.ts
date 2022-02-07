import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MentionuserfriendsPageRoutingModule } from './mentionuserfriends-routing.module';

import { MentionuserfriendsPage } from './mentionuserfriends.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MentionuserfriendsPageRoutingModule
  ],
  declarations: [MentionuserfriendsPage]
})
export class MentionuserfriendsPageModule {}
