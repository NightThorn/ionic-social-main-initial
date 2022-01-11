import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GrindingPage } from './grinding.page';

const routes: Routes = [
  {
    path: '',
    component: GrindingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GrindingPageRoutingModule {}
