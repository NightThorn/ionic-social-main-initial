import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SharemodalPageRoutingModule } from './sharemodal-routing.module';

import { SharemodalPage } from './sharemodal.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharemodalPageRoutingModule,
    ReactiveFormsModule,
    ComponentsModule
  ],
  declarations: [SharemodalPage]
})
export class SharemodalPageModule {}
