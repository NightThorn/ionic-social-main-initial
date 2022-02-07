import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MentionuserPageRoutingModule } from './mentionuser-routing.module';

import { MentionuserPage } from './mentionuser.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { ImageModalPageModule } from '../image-modal/image-modal.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HttpClientModule,
    MentionuserPageRoutingModule,
    ImageModalPageModule,
    ComponentsModule
  ],
  declarations: [MentionuserPage]
})
export class MentionuserPageModule {}
