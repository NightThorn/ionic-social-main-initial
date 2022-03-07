import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditpostmodalPageRoutingModule } from './editpostmodal-routing.module';

import { EditpostmodalPage } from './editpostmodal.page';
import { MentionModule } from 'angular-mentions';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    EditpostmodalPageRoutingModule,
    MentionModule
  ],
  declarations: [EditpostmodalPage]
})
export class EditpostmodalPageModule { }
