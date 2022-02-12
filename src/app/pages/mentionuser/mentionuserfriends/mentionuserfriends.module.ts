import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MentionuserfriendsPageRoutingModule } from './mentionuserfriends-routing.module';

import { MentionuserfriendsPage } from './mentionuserfriends.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    MentionuserfriendsPageRoutingModule
  ],
  declarations: [MentionuserfriendsPage]
})
export class MentionuserfriendsPageModule { }
