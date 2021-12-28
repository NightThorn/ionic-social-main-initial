import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BuymodalPage } from './buymodal.page';

const routes: Routes = [
  {
    path: '',
    component: BuymodalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BuymodalPageRoutingModule {}
