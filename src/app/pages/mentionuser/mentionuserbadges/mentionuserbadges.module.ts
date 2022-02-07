import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MentionuserbadgesPageRoutingModule } from './mentionuserbadges-routing.module';

import { MentionuserbadgesPage } from './mentionuserbadges.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MentionuserbadgesPageRoutingModule
  ],
  declarations: [MentionuserbadgesPage]
})
export class MentionuserbadgesPageModule {}
