import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditgroupPageRoutingModule } from './editgroup-routing.module';

import { EditgroupPage } from './editgroup.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    EditgroupPageRoutingModule
  ],
  declarations: [EditgroupPage]
})
export class EditgroupPageModule {}
