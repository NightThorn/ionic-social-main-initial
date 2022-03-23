import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SettingsPageRoutingModule } from './settings-routing.module';

import { SettingsPage } from './settings.page';
import { EditPageModule } from '../edit/edit.module';
import { PasswordPageModule } from '../password/password.module';
import { BlockedPageModule } from '../blocked/blocked.module';
import { MutedPageModule } from '../muted/muted.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SettingsPageRoutingModule,
    EditPageModule,
    PasswordPageModule,
    BlockedPageModule,
    MutedPageModule
  ],
  declarations: [SettingsPage]
})
export class SettingsPageModule {}
