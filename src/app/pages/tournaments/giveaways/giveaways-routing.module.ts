import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GiveawaysPage } from './giveaways.page';

const routes: Routes = [
  {
    path: '',
    component: GiveawaysPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GiveawaysPageRoutingModule {}
