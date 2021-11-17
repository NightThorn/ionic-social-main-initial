import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { ImageModalPage } from '../image-modal/image-modal.page';
import { ImageModalPageModule } from '../image-modal/image-modal.module';
import { ComponentsModule } from 'src/app/components/components.module';
import { ProfileService } from 'src/app/services/profile.service';
import { UserPage } from './user.page';
import { UserPageRoutingModule } from './user-routing.module';

@NgModule({
  entryComponents: [ImageModalPage],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HttpClientModule,
    UserPageRoutingModule,
    ImageModalPageModule,
    ComponentsModule
  ],
  declarations: [UserPage]
})
export class UserPageModule {}
