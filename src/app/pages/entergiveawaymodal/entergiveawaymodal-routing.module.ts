import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EntergiveawaymodalPage } from './entergiveawaymodal.page';

const routes: Routes = [
  {
    path: '',
    component: EntergiveawaymodalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EntergiveawaymodalPageRoutingModule {}
