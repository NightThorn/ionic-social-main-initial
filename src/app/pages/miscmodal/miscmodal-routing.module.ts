import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MiscmodalPage } from './miscmodal.page';

const routes: Routes = [
  {
    path: '',
    component: MiscmodalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MiscmodalPageRoutingModule {}
