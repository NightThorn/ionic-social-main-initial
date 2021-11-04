import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TournamentDetailsPageRoutingModule } from './tournament-details-routing.module';

import { TournamentDetailsPage } from './tournament-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TournamentDetailsPageRoutingModule
  ],
  declarations: [TournamentDetailsPage]
})
export class TournamentDetailsPageModule {}
