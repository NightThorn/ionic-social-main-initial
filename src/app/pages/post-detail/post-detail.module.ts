import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PostDetailPageRoutingModule } from './post-detail-routing.module';

import { PostDetailPage } from './post-detail.page';
import { UtilsModule } from 'src/app/utils/utils.module';
import { ComponentsModule } from 'src/app/components/components.module';
import { GiphyPageModule } from '../giphy/giphy.module';
import { MentionModule } from 'angular-mentions';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    ComponentsModule,
    PostDetailPageRoutingModule,
    UtilsModule,
    MentionModule,
    GiphyPageModule
  ],
  declarations: [PostDetailPage]
})
export class PostDetailPageModule {}
