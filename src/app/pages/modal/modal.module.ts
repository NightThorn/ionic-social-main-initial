import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalPageRoutingModule } from './modal-routing.module';
import { MentionModule } from 'angular-mentions';

import { ModalPage } from './modal.page';
import { GiphyPageModule } from '../giphy/giphy.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ModalPageRoutingModule,
    GiphyPageModule,
    MentionModule
  ],
  declarations: [ModalPage]
})
export class ModalPageModule { }
