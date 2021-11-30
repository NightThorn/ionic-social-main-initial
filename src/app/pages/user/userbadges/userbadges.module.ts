import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserbadgesPageRoutingModule } from './userbadges-routing.module';

import { UserbadgesPage } from './userbadges.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserbadgesPageRoutingModule
  ],
  declarations: [UserbadgesPage]
})
export class UserbadgesPageModule {}
