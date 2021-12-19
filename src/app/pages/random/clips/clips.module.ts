import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClipsPageRoutingModule } from './clips-routing.module';

import { ClipsPage } from './clips.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    ClipsPageRoutingModule
  ],
  declarations: [ClipsPage]
})
export class ClipsPageModule {}
