import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule } from '@ionic/angular';

import { ProfilePageRoutingModule } from './profile-routing.module';

import { ProfilePage } from './profile.page';
import { ImageModalPage } from '../image-modal/image-modal.page';
import { ImageModalPageModule } from '../image-modal/image-modal.module';
import { ComponentsModule } from 'src/app/components/components.module';
import { ProfileService } from 'src/app/services/profile.service';
import { EditprofilePageModule } from '../editprofile/editprofile.module';

@NgModule({
  entryComponents: [ImageModalPage],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HttpClientModule,
    ProfilePageRoutingModule,
    ImageModalPageModule,
    ComponentsModule,
    EditprofilePageModule
  ],
  declarations: [ProfilePage]
})
export class ProfilePageModule {}
