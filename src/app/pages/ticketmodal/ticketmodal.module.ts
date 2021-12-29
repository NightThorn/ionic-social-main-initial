import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TicketmodalPageRoutingModule } from './ticketmodal-routing.module';

import { TicketmodalPage } from './ticketmodal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    TicketmodalPageRoutingModule
  ],
  declarations: [TicketmodalPage]
})
export class TicketmodalPageModule {}
