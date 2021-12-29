import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BuymerchmodalPage } from './buymerchmodal.page';

const routes: Routes = [
  {
    path: '',
    component: BuymerchmodalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BuymerchmodalPageRoutingModule {}
