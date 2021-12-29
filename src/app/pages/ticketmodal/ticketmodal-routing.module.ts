import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TicketmodalPage } from './ticketmodal.page';

const routes: Routes = [
  {
    path: '',
    component: TicketmodalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TicketmodalPageRoutingModule {}
